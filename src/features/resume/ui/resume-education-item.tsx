"use client";

import { Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ResumePeriodFields } from "@/features/resume/ui/resume-period-fields";
import type { ResumeEducation } from "@/features/resume/types/resume-document";

type Props = {
  education: ResumeEducation;
  onRemove: () => void;
  onUpdate: (partial: Partial<ResumeEducation>) => void;
};

export function ResumeEducationItem({ education, onRemove, onUpdate }: Props) {
  return (
    <FieldGroup className="px-1 pt-2 pb-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Field>
          <FieldLabel htmlFor={`education-degree-${education.id}`}>
            Curso
          </FieldLabel>
          <Input
            id={`education-degree-${education.id}`}
            onChange={(event) => onUpdate({ degreeName: event.target.value })}
            value={education.degreeName}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor={`education-school-${education.id}`}>
            Instituicao
          </FieldLabel>
          <Input
            id={`education-school-${education.id}`}
            onChange={(event) => onUpdate({ schoolName: event.target.value })}
            value={education.schoolName}
          />
        </Field>
      </div>
      <Field>
        <FieldLabel htmlFor={`education-field-${education.id}`}>
          Area de estudo
        </FieldLabel>
        <Input
          id={`education-field-${education.id}`}
          onChange={(event) => onUpdate({ fieldOfStudy: event.target.value })}
          value={education.fieldOfStudy ?? ""}
        />
      </Field>
      <ResumePeriodFields
        id={education.id}
        onChange={(period) => onUpdate({ period })}
        period={education.period}
      />
      <Button onClick={onRemove} size="sm" type="button" variant="ghost">
        <Trash2Icon data-icon="inline-start" />
        Remover formacao
      </Button>
    </FieldGroup>
  );
}
