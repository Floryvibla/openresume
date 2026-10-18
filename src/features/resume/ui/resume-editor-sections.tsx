"use client";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { ResumeExperienceAccordion } from "@/features/resume/ui/resume-experience-accordion";
import { ResumeSkillsInput } from "@/features/resume/ui/resume-skills-input";
import type { ResumeDocument } from "@/features/resume/types/resume-document";

type Props = {
  onChange: (partial: Partial<ResumeDocument>) => void;
  resume: ResumeDocument;
};

export function ResumeEditorSections({ onChange, resume }: Props) {
  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="resume-summary">Resumo</FieldLabel>
        <Textarea
          id="resume-summary"
          onChange={(event) => onChange({ summary: event.target.value })}
          rows={4}
          value={resume.summary}
        />
      </Field>
      <ResumeSkillsInput
        onChange={(skills) => onChange({ skills })}
        value={resume.skills}
      />
      <Field>
        <FieldTitle>Experiencias</FieldTitle>
        <ResumeExperienceAccordion
          experiences={resume.experiences}
          onChange={(experiences) => onChange({ experiences })}
        />
      </Field>
    </FieldGroup>
  );
}
