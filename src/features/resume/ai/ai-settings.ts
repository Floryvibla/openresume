import { z } from "zod";

import {
  aiProviderCatalog,
  aiProviderKeys,
} from "@/features/resume/ai/ai-provider-catalog";

export const aiSettingsSchema = z.object({
  apiKey: z.string(),
  model: z.string(),
  provider: z.enum(aiProviderKeys),
});

export type AiSettings = z.infer<typeof aiSettingsSchema>;

const defaultProvider = aiProviderKeys[0];

export const defaultAiSettings: AiSettings = {
  apiKey: "",
  model: aiProviderCatalog[defaultProvider].defaultModel,
  provider: defaultProvider,
};
