"use client";

import { useState } from "react";

import { apiClient } from "@/lib/axios";
import type { ResumeDocument } from "@/features/resume/types/resume-document";

type ImportResponse = {
  resume: ResumeDocument;
};

export function useLinkedinResumeRefresh(onRefreshed: (resume: ResumeDocument) => void) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function refreshFromLinkedin(publicIdentifier: string) {
    setIsRefreshing(true);
    setErrorMessage(null);

    try {
      const response = await apiClient.get<ImportResponse>("/api/linkedin/import", {
        params: { identifier: publicIdentifier },
      });

      onRefreshed(response.data.resume);
    } catch {
      setErrorMessage("Nao foi possivel atualizar o curriculo agora.");
    } finally {
      setIsRefreshing(false);
    }
  }

  return { errorMessage, isRefreshing, refreshFromLinkedin };
}
