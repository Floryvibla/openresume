"use client";

import { useState } from "react";

import { useBoolean } from "usehooks-ts";

import type { AiSettings } from "@/features/resume/ai/ai-settings";
import {
  aiSuggestionErrorMessage,
  readAiErrorMessage,
} from "@/features/resume/ai/read-ai-error-message";
import type { ResumeAiPatch } from "@/features/resume/ai/resume-ai-patch";
import type { ResumeAiSectionKey } from "@/features/resume/ai/resume-ai-sections";
import { readSuggestionStream } from "@/features/resume/ai/read-suggestion-stream";
import type { ResumeDocument } from "@/features/resume/types/resume-document";

export type ResumeAiSuggestionRequest = {
  jobDescription: string;
  jobUrl: string;
  resume: ResumeDocument;
  settings: AiSettings;
};

export type ResumeAiSuggestResult = {
  errorMessage: string;
  patch: ResumeAiPatch | null;
};

export function useResumeAiSuggest() {
  const {
    value: isLoading,
    setFalse: stopLoading,
    setTrue: startLoading,
  } = useBoolean(false);
  const [activeSection, setActiveSection] = useState<ResumeAiSectionKey | null>(
    null,
  );

  async function suggest(
    request: ResumeAiSuggestionRequest,
  ): Promise<ResumeAiSuggestResult> {
    setActiveSection(null);
    startLoading();

    try {
      const response = await fetch("/api/resumes/ai/suggest", {
        body: JSON.stringify(request),
        headers: { "content-type": "application/json" },
        method: "POST",
      });

      if (!response.ok) {
        return { errorMessage: await readAiErrorMessage(response), patch: null };
      }

      if (!response.body) {
        return { errorMessage: aiSuggestionErrorMessage, patch: null };
      }

      const patch = await readSuggestionStream(response.body, setActiveSection);

      return { errorMessage: patch ? "" : aiSuggestionErrorMessage, patch };
    } catch (error) {
      return {
        errorMessage:
          error instanceof Error ? error.message : aiSuggestionErrorMessage,
        patch: null,
      };
    } finally {
      stopLoading();
      setActiveSection(null);
    }
  }

  return { activeSection, isLoading, suggest };
}
