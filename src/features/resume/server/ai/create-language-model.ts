import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import type { LanguageModel } from "ai";

import type { AiSettings } from "@/features/resume/ai/ai-settings";

export function createLanguageModel({
  apiKey,
  model,
  provider,
}: AiSettings): LanguageModel {
  if (provider === "openai") {
    return createOpenAI({ apiKey }).chat(model);
  }

  if (provider === "google") {
    return createGoogleGenerativeAI({ apiKey })(model);
  }

  if (provider === "openrouter") {
    return createOpenRouter({ apiKey })(model);
  }

  return createAnthropic({ apiKey })(model);
}
