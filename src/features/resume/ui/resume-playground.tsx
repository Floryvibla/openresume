"use client";

import { useResumePlayground } from "@/features/resume/hooks/use-resume-playground";
import type { ResumeDocument } from "@/features/resume/types/resume-document";
import { ResumeActions } from "@/features/resume/ui/resume-actions";
import { ResumeAiDialog } from "@/features/resume/ui/resume-ai-dialog";
import { ResumeAiFloatingButton } from "@/features/resume/ui/resume-ai-floating-button";
import { ResumeEditorSheet } from "@/features/resume/ui/resume-editor-sheet";
import { ResumePreview } from "@/features/resume/ui/resume-preview";
import { ResumePreviewSkeleton } from "@/features/resume/ui/resume-preview-skeleton";
import { ResumeVersionDialog } from "@/features/resume/ui/resume-version-dialog";

type Props = {
  resume: ResumeDocument;
  resumeId?: string;
};

type DialogController = {
  setFalse: () => void;
  setTrue: () => void;
};

function toOpenChange(dialog: DialogController) {
  return (nextIsOpen: boolean) =>
    nextIsOpen ? dialog.setTrue() : dialog.setFalse();
}

export function ResumePlayground({ resume, resumeId }: Props) {
  const {
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
  } = useResumePlayground({ resume, resumeId });

  return (
    <section className="flex flex-col items-center gap-6">
      <div className="flex w-full flex-col items-center gap-2">
        <ResumeActions
          isRefreshing={isRefreshing}
          onEditClick={editorDialog.setTrue}
          onHistoryClick={historyDialog.setTrue}
          onRefreshClick={handleRefreshClick}
          resume={draftResume}
        />
        {errorMessage ? (
          <p className="text-sm text-destructive">{errorMessage}</p>
        ) : null}
      </div>
      <ResumeEditorSheet
        isOpen={editorDialog.value}
        onOpenChange={toOpenChange(editorDialog)}
        onSaved={setDraftResume}
        resume={draftResume}
        resumeId={resumeId}
      />
      <ResumeAiDialog
        isGenerating={isGenerating}
        isOpen={aiDialog.value}
        onOpenChange={toOpenChange(aiDialog)}
        onSettingsChange={updateSettings}
        onSubmit={handleAiSubmit}
        settings={settings}
      />
      <ResumeVersionDialog
        isOpen={historyDialog.value}
        onOpenChange={toOpenChange(historyDialog)}
        onRestore={handleRestoreVersion}
        versions={versions}
      />
      <div className="h-[92vh] overflow-y-auto">
        {isGenerating ? (
          <ResumePreviewSkeleton
            activeSection={activeSection}
            resume={draftResume}
          />
        ) : (
          <ResumePreview resume={draftResume} />
        )}
      </div>
      <ResumeAiFloatingButton
        isGenerating={isGenerating}
        onClick={aiDialog.setTrue}
      />
    </section>
  );
}
