"use client";

import { useState } from "react";

import { toast } from "sonner";
import { useBoolean } from "usehooks-ts";

import { applyResumeAiPatch } from "@/features/resume/ai/resume-ai-patch";
import type { ResumeAiJobInput } from "@/features/resume/ai/resume-ai-job-input";
import { useAiSettings } from "@/features/resume/hooks/use-ai-settings";
import { useLinkedinResumeRefresh } from "@/features/resume/hooks/use-linkedin-resume-refresh";
import { useResumeAiSuggest } from "@/features/resume/hooks/use-resume-ai-suggest";
import { useResumeVersionHistory } from "@/features/resume/hooks/use-resume-version-history";
import type { ResumeDocument } from "@/features/resume/types/resume-document";

type UseResumePlaygroundInput = {
  resume: ResumeDocument;
  resumeId?: string;
};

export function useResumePlayground({
  resume,
  resumeId,
}: UseResumePlaygroundInput) {
  const [draftResume, setDraftResume] = useState(resume);
  const editorDialog = useBoolean(false);
  const aiDialog = useBoolean(false);
  const historyDialog = useBoolean(false);
  const { settings, updateSettings } = useAiSettings();
  const {
    activeSection,
    isLoading: isGenerating,
    suggest,
  } = useResumeAiSuggest();
  const { saveVersion, versions } = useResumeVersionHistory(
    `openresume:versions:${resumeId ?? resume.basics.publicIdentifier}`,
  );
  const { errorMessage, isRefreshing, refreshFromLinkedin } =
    useLinkedinResumeRefresh(setDraftResume);

  function handleRefreshClick() {
    void refreshFromLinkedin(draftResume.basics.publicIdentifier);
  }

  async function handleAiSubmit({ jobDescription, jobUrl }: ResumeAiJobInput) {
    const result = await suggest({
      jobDescription,
      jobUrl,
      resume: draftResume,
      settings,
    });

    if (!result.patch) {
      toast.error(result.errorMessage);
      return;
    }

    const nextResume = applyResumeAiPatch(draftResume, result.patch);
    setDraftResume(nextResume);
    saveVersion(nextResume, `Sugestao ${versions.length + 1}`);
    toast.success("Curriculo melhorado com IA.", {
      description: `${result.patch.changes.length} ajustes aplicados e salvos no historico.`,
    });
  }

  function handleRestoreVersion(nextResume: ResumeDocument) {
    setDraftResume(nextResume);
    historyDialog.setFalse();
  }

  return {
    activeSection,
    aiDialog,
    draftResume,
    editorDialog,
    errorMessage,
    handleAiSubmit,
    handleRefreshClick,
    handleRestoreVersion,
    historyDialog,
    isGenerating,
    isRefreshing,
    setDraftResume,
    settings,
    updateSettings,
    versions,
  };
}
