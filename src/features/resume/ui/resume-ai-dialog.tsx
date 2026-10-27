"use client";

import { useState } from "react";

import { SparklesIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { AiSettings } from "@/features/resume/ai/ai-settings";
import type { ResumeAiJobInput } from "@/features/resume/ai/resume-ai-job-input";
import { ResumeAiJobTabs } from "@/features/resume/ui/resume-ai-job-tabs";
import { ResumeAiProviderFields } from "@/features/resume/ui/resume-ai-provider-fields";

type Props = {
  isGenerating: boolean;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSettingsChange: (partial: Partial<AiSettings>) => void;
  onSubmit: (input: ResumeAiJobInput) => void;
  settings: AiSettings;
};

export function ResumeAiDialog({
  isGenerating,
  isOpen,
  onOpenChange,
  onSettingsChange,
  onSubmit,
  settings,
}: Props) {
  const [jobDescription, setJobDescription] = useState("");
  const [jobUrl, setJobUrl] = useState("");

  function handleSubmitClick() {
    onSubmit({ jobDescription, jobUrl });
    setJobDescription("");
    setJobUrl("");
    onOpenChange(false);
  }

  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Melhorar curriculo com IA</DialogTitle>
          <DialogDescription>
            Informe a vaga (opcional) e clique em melhorar. A geracao roda em
            segundo plano e voce acompanha pelo proprio curriculo.
          </DialogDescription>
        </DialogHeader>
        <div className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto">
          <ResumeAiJobTabs
            jobDescription={jobDescription}
            jobUrl={jobUrl}
            onJobDescriptionChange={setJobDescription}
            onJobUrlChange={setJobUrl}
          />
          <ResumeAiProviderFields onChange={onSettingsChange} settings={settings} />
          <Button
            className="self-start"
            disabled={!settings.apiKey || isGenerating}
            onClick={handleSubmitClick}
            type="button"
          >
            <SparklesIcon data-icon="inline-start" />
            Melhorar com IA
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
