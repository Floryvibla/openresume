import type {
  AiModelOption,
  AiProviderKey,
} from "@/features/resume/ai/ai-provider-catalog";

const vercelGatewayModelsUrl = "https://ai-gateway.vercel.sh/v1/models";
const openRouterModelsUrl = "https://openrouter.ai/api/v1/models";
const requestTimeoutInMilliseconds = 10000;
const languageModelType = "language";
const textOutputModality = "text";

function readModels(payload: unknown) {
  const data = (payload as { data?: unknown }).data;
  return Array.isArray(data) ? data : [];
}

function readString(value: unknown) {
  return typeof value === "string" ? value : "";
}

async function fetchModels(url: string) {
  const response = await fetch(url, {
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(requestTimeoutInMilliseconds),
  });

  if (!response.ok) {
    throw new Error("Nao foi possivel carregar os modelos.");
  }

  return response.json();
}

function toGatewayModels(payload: unknown, provider: AiProviderKey) {
  const providerPrefix = `${provider}/`;

  return readModels(payload)
    .filter((model) => readString((model as { type?: unknown }).type) === languageModelType)
    .map((model) => {
      const id = readString((model as { id?: unknown }).id);
      return { id, label: readString((model as { name?: unknown }).name) };
    })
    .filter((model) => model.id.startsWith(providerPrefix))
    .map((model) => ({
      id: model.id.slice(providerPrefix.length),
      label: model.label || model.id.slice(providerPrefix.length),
    }));
}

function toOpenRouterModels(payload: unknown) {
  return readModels(payload)
    .filter((model) => {
      const modalities = (model as { architecture?: { output_modalities?: unknown } })
        .architecture?.output_modalities;
      return Array.isArray(modalities) && modalities.includes(textOutputModality);
    })
    .map((model) => {
      const id = readString((model as { id?: unknown }).id);
      return { id, label: readString((model as { name?: unknown }).name) || id };
    })
    .filter((model) => model.id.length > 0);
}

export async function listAiModels(provider: AiProviderKey): Promise<AiModelOption[]> {
  const payload = await fetchModels(
    provider === "openrouter" ? openRouterModelsUrl : vercelGatewayModelsUrl,
  );

  const models =
    provider === "openrouter" ? toOpenRouterModels(payload) : toGatewayModels(payload, provider);

  return models.sort((firstModel, secondModel) => firstModel.id.localeCompare(secondModel.id));
}
