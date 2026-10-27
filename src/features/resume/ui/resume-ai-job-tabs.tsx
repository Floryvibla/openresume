"use client";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const jobTabs = {
  description: "description",
  link: "link",
} as const;

type Props = {
  jobDescription: string;
  jobUrl: string;
  onJobDescriptionChange: (jobDescription: string) => void;
  onJobUrlChange: (jobUrl: string) => void;
};

export function ResumeAiJobTabs({
  jobDescription,
  jobUrl,
  onJobDescriptionChange,
  onJobUrlChange,
}: Props) {
  return (
    <Tabs defaultValue={jobTabs.description}>
      <TabsList className="w-full">
        <TabsTrigger value={jobTabs.description}>Descricao</TabsTrigger>
        <TabsTrigger value={jobTabs.link}>Link do LinkedIn</TabsTrigger>
      </TabsList>
      <TabsContent value={jobTabs.description}>
        <Field>
          <FieldLabel htmlFor="resume-ai-job-description">
            Descricao da vaga
          </FieldLabel>
          <Textarea
            className="max-h-72 min-h-44"
            id="resume-ai-job-description"
            onChange={(event) => onJobDescriptionChange(event.target.value)}
            placeholder="Cole aqui o texto completo da vaga."
            value={jobDescription}
          />
          <FieldDescription>
            Opcional. Sem a vaga, a IA aplica apenas boas praticas de curriculo.
          </FieldDescription>
        </Field>
      </TabsContent>
      <TabsContent value={jobTabs.link}>
        <Field>
          <FieldLabel htmlFor="resume-ai-job-url">Link da vaga</FieldLabel>
          <Input
            id="resume-ai-job-url"
            onChange={(event) => onJobUrlChange(event.target.value)}
            placeholder="https://www.linkedin.com/jobs/view/..."
            type="url"
            value={jobUrl}
          />
          <FieldDescription>
            Cole o link da vaga do LinkedIn ou de outro site.
          </FieldDescription>
        </Field>
      </TabsContent>
    </Tabs>
  );
}
