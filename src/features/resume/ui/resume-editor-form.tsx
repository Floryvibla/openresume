"use client";

import { useMemo, useState } from "react";

import { useBoolean } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { ResumeLanguagePicker } from "@/features/resume/ui/resume-language-picker";
import { ResumeSectionVisibilityPicker } from "@/features/resume/ui/resume-section-visibility-picker";
import { ThemeColorPicker } from "@/features/resume/ui/theme-color-picker";
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
  const { value: isSaving, setFalse: stopSaving, setTrue: startSaving } = useBoolean(false);
  const skillsValue = useMemo(() => draftResume.skills.join(", "), [draftResume.skills]);

  function updateResume(nextResume: ResumeDocument) {
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

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="resume-title">Titulo interno</FieldLabel>
          <Input id="resume-title" onChange={(event) => setDraftTitle(event.target.value)} value={draftTitle} />
        </Field>
        <div className="grid gap-4 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="resume-name">Nome completo</FieldLabel>
            <Input
              id="resume-name"
              onChange={(event) =>
                updateResume({ ...draftResume, basics: { ...draftResume.basics, fullName: event.target.value } })
              }
              value={draftResume.basics.fullName}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="resume-headline">Headline</FieldLabel>
            <Input
              id="resume-headline"
              onChange={(event) =>
                updateResume({ ...draftResume, basics: { ...draftResume.basics, headline: event.target.value } })
              }
              value={draftResume.basics.headline}
            />
          </Field>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Field>
            <FieldLabel htmlFor="resume-location">Localizacao</FieldLabel>
            <Input
              id="resume-location"
              onChange={(event) =>
                updateResume({ ...draftResume, basics: { ...draftResume.basics, location: event.target.value } })
              }
              value={draftResume.basics.location}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="resume-email">Email</FieldLabel>
            <Input
              id="resume-email"
              onChange={(event) =>
                updateResume({ ...draftResume, basics: { ...draftResume.basics, email: event.target.value } })
              }
              value={draftResume.basics.email}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="resume-phone">Telefone</FieldLabel>
            <Input
              id="resume-phone"
              onChange={(event) =>
                updateResume({ ...draftResume, basics: { ...draftResume.basics, phone: event.target.value } })
              }
              value={draftResume.basics.phone}
            />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="resume-summary">Resumo</FieldLabel>
          <Textarea
            id="resume-summary"
            onChange={(event) => updateResume({ ...draftResume, summary: event.target.value })}
            rows={6}
            value={draftResume.summary}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="resume-skills">Skills</FieldLabel>
          <Input
            id="resume-skills"
            onChange={(event) =>
              updateResume({
                ...draftResume,
                skills: event.target.value.split(",").map((item) => item.trim()).filter(Boolean),
              })
            }
            value={skillsValue}
          />
          <FieldDescription>Separe cada skill com virgula.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel>Idioma</FieldLabel>
          <ResumeLanguagePicker
            onValueChange={(value) => updateResume({ ...draftResume, language: value })}
            value={draftResume.language}
          />
        </Field>
        <Field>
          <FieldLabel>Secoes visiveis</FieldLabel>
          <ResumeSectionVisibilityPicker
            language={draftResume.language}
            onValueChange={(value) => updateResume({ ...draftResume, visibleSections: value })}
            value={draftResume.visibleSections}
          />
        </Field>
        <Field>
          <FieldLabel>Cor</FieldLabel>
          <ThemeColorPicker
            onValueChange={(value) => updateResume({ ...draftResume, theme: value })}
            value={draftResume.theme}
          />
        </Field>
        {draftResume.experiences.map((experience, index) => (
          <Field key={experience.id}>
            <FieldLabel htmlFor={`experience-${experience.id}`}>Experiencia {index + 1}</FieldLabel>
            <Textarea
              id={`experience-${experience.id}`}
              onChange={(event) =>
                updateResume({
                  ...draftResume,
                  experiences: draftResume.experiences.map((item) =>
                    item.id === experience.id ? { ...item, description: event.target.value } : item,
                  ),
                })
              }
              rows={4}
              value={experience.description ?? ""}
            />
            <FieldDescription>{experience.title} · {experience.companyName}</FieldDescription>
          </Field>
        ))}
      </FieldGroup>
      <Button disabled={!resumeId || isSaving} type="submit">
        {isSaving ? <Spinner data-icon="inline-start" /> : null}
        {resumeId ? "Salvar alteracoes" : "Pronto para salvar no workspace"}
      </Button>
    </form>
  );
}
