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
import { ResumeExperiencePeriod } from "@/features/resume/ui/resume-experience-period";
import type { ResumeExperience } from "@/features/resume/types/resume-document";

type Props = {
  experience: ResumeExperience;
  onChange: (experience: ResumeExperience) => void;
  onRemove: () => void;
};

export function ResumeExperienceItem({ experience, onChange, onRemove }: Props) {
  function updateExperience(partial: Partial<ResumeExperience>) {
    onChange({ ...experience, ...partial });
  }

  return (
    <FieldGroup className="px-1 pt-2 pb-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Field>
          <FieldLabel htmlFor={`experience-title-${experience.id}`}>
            Cargo
          </FieldLabel>
          <Input
            id={`experience-title-${experience.id}`}
            onChange={(event) => updateExperience({ title: event.target.value })}
            value={experience.title}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor={`experience-company-${experience.id}`}>
            Empresa
          </FieldLabel>
          <Input
            id={`experience-company-${experience.id}`}
            onChange={(event) =>
              updateExperience({ companyName: event.target.value })
            }
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
          onChange={(event) =>
            updateExperience({ location: event.target.value })
          }
          value={experience.location ?? ""}
        />
      </Field>
      <ResumeExperiencePeriod
        id={experience.id}
        onChange={(period) => updateExperience({ period })}
        period={experience.period}
      />
      <Field>
        <FieldLabel htmlFor={`experience-description-${experience.id}`}>
          Descricao
        </FieldLabel>
        <Textarea
          id={`experience-description-${experience.id}`}
          onChange={(event) =>
            updateExperience({ description: event.target.value })
          }
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
