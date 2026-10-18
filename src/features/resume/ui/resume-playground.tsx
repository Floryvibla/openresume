"use client";

import { useState } from "react";

import { useBoolean } from "usehooks-ts";

import { ResumeActions } from "@/features/resume/ui/resume-actions";
import { ResumeEditorSheet } from "@/features/resume/ui/resume-editor-sheet";
import { ResumePreview } from "@/features/resume/ui/resume-preview";
import { useLinkedinResumeRefresh } from "@/features/resume/hooks/use-linkedin-resume-refresh";
import type { ResumeDocument } from "@/features/resume/types/resume-document";

type Props = {
  initialTitle: string;
  resume: ResumeDocument;
  resumeId?: string;
};

export function ResumePlayground({ initialTitle, resume, resumeId }: Props) {
  const [draftResume, setDraftResume] = useState(resume);
  const {
    value: isEditorOpen,
    setFalse: closeEditor,
    setTrue: openEditor,
  } = useBoolean(false);
  const { errorMessage, isRefreshing, refreshFromLinkedin } =
    useLinkedinResumeRefresh(setDraftResume);

  function handleRefreshClick() {
    void refreshFromLinkedin(draftResume.basics.publicIdentifier);
  }

  return (
    <section className="flex flex-col items-center gap-6">
      {/* <Card className="h-fit rounded-[28px] border shadow-none">
        <CardHeader>
          <CardTitle>Editor do curriculo</CardTitle>
        </CardHeader>
        <CardContent>
          <ResumeEditorForm
            onSaved={setDraftResume}
            resume={draftResume}
            resumeId={resumeId}
            title={initialTitle}
          />
        </CardContent>
      </Card> */}
      <div className="flex w-full flex-col items-center gap-2">
        <ResumeActions
          isRefreshing={isRefreshing}
          onEditClick={openEditor}
          onRefreshClick={handleRefreshClick}
          resume={draftResume}
          resumeId={resumeId}
        />
        {errorMessage ? (
          <p className="text-sm text-destructive">{errorMessage}</p>
        ) : null}
      </div>
      <ResumeEditorSheet
        isOpen={isEditorOpen}
        onOpenChange={(nextIsOpen) =>
          nextIsOpen ? openEditor() : closeEditor()
        }
        onSaved={setDraftResume}
        resume={draftResume}
        resumeId={resumeId}
        title={initialTitle}
      />
      <div className="h-[92vh] overflow-y-auto">
        <ResumePreview resume={draftResume} />
      </div>
    </section>
  );
}
