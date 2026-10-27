export const aiProviderKeys = [
  "anthropic",
  "openai",
  "google",
  "openrouter",
] as const;

export type AiProviderKey = (typeof aiProviderKeys)[number];

export type AiModelOption = {
  id: string;
  label: string;
};

type AiProviderDefinition = {
  apiKeyLabel: string;
  apiKeyPlaceholder: string;
  defaultModel: string;
  label: string;
};

export const aiProviderCatalog: Record<AiProviderKey, AiProviderDefinition> = {
  anthropic: {
    apiKeyLabel: "Chave da API Anthropic",
    apiKeyPlaceholder: "sk-ant-...",
    defaultModel: "claude-sonnet-5",
    label: "Anthropic",
  },
  openai: {
    apiKeyLabel: "Chave da API OpenAI",
    apiKeyPlaceholder: "sk-...",
    defaultModel: "gpt-5.4",
    label: "OpenAI",
  },
  google: {
    apiKeyLabel: "Chave da API Google AI",
    apiKeyPlaceholder: "AIza...",
    defaultModel: "gemini-3.5-flash",
    label: "Google",
  },
  openrouter: {
    apiKeyLabel: "Chave da API OpenRouter",
    apiKeyPlaceholder: "sk-or-...",
    defaultModel: "openai/gpt-5.4",
    label: "OpenRouter",
  },
};
