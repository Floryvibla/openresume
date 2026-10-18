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
      <ResumeActions resume={draftResume} resumeId={resumeId} />
      <div className="h-[92vh] overflow-y-auto">
        <ResumePreview resume={draftResume} />
      </div>
    </section>
  );
}
