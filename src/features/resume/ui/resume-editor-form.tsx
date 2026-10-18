"use client";

import { useState } from "react";

import { useBoolean } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ResumeBasicsFields } from "@/features/resume/ui/resume-basics-fields";
import { ResumeEditorPreferences } from "@/features/resume/ui/resume-editor-preferences";
import { ResumeEditorSections } from "@/features/resume/ui/resume-editor-sections";
import { type ResumeDocument } from "@/features/resume/types/resume-document";
import { apiClient } from "@/lib/axios";

type Props = {
  onSaved: (nextResume: ResumeDocument) => void;
  resume: ResumeDocument;
  resumeId?: string;
};

export function ResumeEditorForm({ onSaved, resume, resumeId }: Props) {
  const [draftResume, setDraftResume] = useState(resume);
  const {
    value: isSaving,
    setFalse: stopSaving,
    setTrue: startSaving,
  } = useBoolean(false);

  function updateResume(partial: Partial<ResumeDocument>) {
    const nextResume = { ...draftResume, ...partial };
    setDraftResume(nextResume);
    onSaved(nextResume);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!resumeId) {
      return;
    }

    startSaving();

    try {
      await apiClient.patch(`/api/resumes/${resumeId}`, {
        documentJson: draftResume,
        themeKey: draftResume.theme,
        title: draftResume.basics.fullName,
      });
    } finally {
      stopSaving();
    }
  }

  const saveButton = resumeId ? (
    <Button disabled={isSaving} type="submit">
      {isSaving ? <Spinner data-icon="inline-start" /> : null}
      Salvar alteracoes
    </Button>
  ) : null;

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      {saveButton}
      <ResumeEditorPreferences
        language={draftResume.language}
        onLanguageChange={(language) => updateResume({ language })}
        onThemeChange={(theme) => updateResume({ theme })}
        theme={draftResume.theme}
      />
      <ResumeBasicsFields
        basics={draftResume.basics}
        onBasicsChange={(basics) => updateResume({ basics })}
      />
      <ResumeEditorSections onChange={updateResume} resume={draftResume} />
      {saveButton}
    </form>
  );
}
