"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResumeActions } from "@/features/resume/ui/resume-actions";
import { ResumeEditorForm } from "@/features/resume/ui/resume-editor-form";
import { ResumePreview } from "@/features/resume/ui/resume-preview";
import type { ResumeDocument } from "@/features/resume/types/resume-document";

type Props = {
  initialTitle: string;
  resume: ResumeDocument;
  resumeId?: string;
};

export function ResumePlayground({ initialTitle, resume, resumeId }: Props) {
  const [draftResume, setDraftResume] = useState(resume);

  return (
    <section className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
      <Card className="h-fit rounded-[28px] border shadow-none">
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
      </Card>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold tracking-tight">Preview A4</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            Papel A4 em miniatura, centralizado e responsivo. O total de paginas aparece acima da visualizacao.
          </p>
        </div>
        <ResumeActions resume={draftResume} resumeId={resumeId} />
        <ResumePreview resume={draftResume} />
      </div>
    </section>
  );
}
