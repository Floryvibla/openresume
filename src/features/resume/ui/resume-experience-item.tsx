"use client";

import { Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumePeriodFields } from "@/features/resume/ui/resume-period-fields";
import type { ResumeExperience } from "@/features/resume/types/resume-document";

type Props = {
  experience: ResumeExperience;
  onRemove: () => void;
  onUpdate: (partial: Partial<ResumeExperience>) => void;
};

export function ResumeExperienceItem({ experience, onRemove, onUpdate }: Props) {
  return (
    <FieldGroup className="px-1 pt-2 pb-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Field>
          <FieldLabel htmlFor={`experience-title-${experience.id}`}>
            Cargo
          </FieldLabel>
          <Input
            id={`experience-title-${experience.id}`}
            onChange={(event) => onUpdate({ title: event.target.value })}
            value={experience.title}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor={`experience-company-${experience.id}`}>
            Empresa
          </FieldLabel>
          <Input
            id={`experience-company-${experience.id}`}
            onChange={(event) => onUpdate({ companyName: event.target.value })}
            value={experience.companyName}
          />
        </Field>
      </div>
      <Field>
        <FieldLabel htmlFor={`experience-location-${experience.id}`}>
          Localizacao
        </FieldLabel>
        <Input
          id={`experience-location-${experience.id}`}
          onChange={(event) => onUpdate({ location: event.target.value })}
          value={experience.location ?? ""}
        />
      </Field>
      <ResumePeriodFields
        id={experience.id}
        onChange={(period) => onUpdate({ period })}
        period={experience.period}
      />
      <Field>
        <FieldLabel htmlFor={`experience-description-${experience.id}`}>
          Descricao
        </FieldLabel>
        <Textarea
          id={`experience-description-${experience.id}`}
          onChange={(event) => onUpdate({ description: event.target.value })}
          placeholder={"- Descreva uma responsabilidade\n- Descreva um resultado"}
          rows={4}
          value={experience.description ?? ""}
        />
        <FieldDescription>
          Use um traco (-) no inicio de cada linha para criar os topicos.
        </FieldDescription>
      </Field>
      <Button onClick={onRemove} size="sm" type="button" variant="ghost">
        <Trash2Icon data-icon="inline-start" />
        Remover experiencia
      </Button>
    </FieldGroup>
  );
}
