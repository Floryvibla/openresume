"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ResumeEditorForm } from "@/features/resume/ui/resume-editor-form";
import type { ResumeDocument } from "@/features/resume/types/resume-document";

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSaved: (nextResume: ResumeDocument) => void;
  resume: ResumeDocument;
  resumeId?: string;
  title: string;
};

export function ResumeEditorSheet({
  isOpen,
  onOpenChange,
  onSaved,
  resume,
  resumeId,
  title,
}: Props) {
  return (
    <Sheet onOpenChange={onOpenChange} open={isOpen}>
      <SheetContent className="sm:max-w-xl" side="right">
        <SheetHeader>
          <SheetTitle>Editar curriculo</SheetTitle>
          <SheetDescription>
            Ajuste textos, secoes, idioma e cor. O preview atualiza enquanto voce edita.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-4 pb-6">
          <ResumeEditorForm
            onSaved={onSaved}
            resume={resume}
            resumeId={resumeId}
            title={title}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
