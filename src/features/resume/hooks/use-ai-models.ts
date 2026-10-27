"use client";

import useSWR from "swr";

import type {
  AiModelOption,
  AiProviderKey,
} from "@/features/resume/ai/ai-provider-catalog";
import { apiClient } from "@/lib/axios";

async function fetchAiModels(url: string) {
  const response = await apiClient.get<{ models: AiModelOption[] }>(url);
  return response.data.models;
}

export function useAiModels(provider: AiProviderKey) {
  const { data, error, isLoading } = useSWR(
    `/api/resumes/ai/models?provider=${provider}`,
    fetchAiModels,
  );

  return {
    errorMessage: error ? "Nao foi possivel carregar os modelos." : "",
    isLoading,
    models: data ?? [],
  };
}
