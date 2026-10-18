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
  title: string;
};

export function ResumeEditorForm({ onSaved, resume, resumeId, title }: Props) {
  const [draftResume, setDraftResume] = useState(resume);
  const [draftTitle, setDraftTitle] = useState(title);
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
        title: draftTitle,
      });
    } finally {
      stopSaving();
    }
  }

  const saveButton = (
    <Button disabled={!resumeId || isSaving} type="submit">
      {isSaving ? <Spinner data-icon="inline-start" /> : null}
      {resumeId ? "Salvar alteracoes" : "Pronto para salvar no workspace"}
    </Button>
  );

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 rounded-lg border bg-muted/30 p-4">
        <ResumeEditorPreferences
          language={draftResume.language}
          onLanguageChange={(language) => updateResume({ language })}
          onThemeChange={(theme) => updateResume({ theme })}
          onVisibleSectionsChange={(visibleSections) =>
            updateResume({ visibleSections })
          }
          theme={draftResume.theme}
          visibleSections={draftResume.visibleSections}
        />
        {saveButton}
      </div>
      <ResumeBasicsFields
        basics={draftResume.basics}
        onBasicsChange={(basics) => updateResume({ basics })}
        onTitleChange={setDraftTitle}
        title={draftTitle}
      />
      <ResumeEditorSections onChange={updateResume} resume={draftResume} />
      {saveButton}
    </form>
  );
}
