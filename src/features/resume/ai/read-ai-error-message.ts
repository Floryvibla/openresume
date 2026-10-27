export const aiSuggestionErrorMessage =
  "Nao foi possivel gerar as sugestoes. Confira a chave da API e o modelo escolhido.";

export async function readAiErrorMessage(response: Response) {
  try {
    const payload = (await response.json()) as { message?: unknown };
    const message = payload.message;

    if (typeof message === "string" && message.trim()) {
      return message;
    }
  } catch {
    return `Falha na API (${response.status}).`;
  }

  return aiSuggestionErrorMessage;
}
