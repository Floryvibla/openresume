"use client";

import { Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ResumePeriodFields } from "@/features/resume/ui/resume-period-fields";
import type { ResumeCertification } from "@/features/resume/types/resume-document";

type Props = {
  certification: ResumeCertification;
  onRemove: () => void;
  onUpdate: (partial: Partial<ResumeCertification>) => void;
};

export function ResumeCertificationItem({
  certification,
  onRemove,
  onUpdate,
}: Props) {
  return (
    <FieldGroup className="px-1 pt-2 pb-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Field>
          <FieldLabel htmlFor={`certification-name-${certification.id}`}>
            Nome
          </FieldLabel>
          <Input
            id={`certification-name-${certification.id}`}
            onChange={(event) => onUpdate({ name: event.target.value })}
            value={certification.name}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor={`certification-issuer-${certification.id}`}>
            Emissor
          </FieldLabel>
          <Input
            id={`certification-issuer-${certification.id}`}
            onChange={(event) => onUpdate({ issuer: event.target.value })}
            value={certification.issuer}
          />
        </Field>
      </div>
      <ResumePeriodFields
        id={certification.id}
        onChange={(period) => onUpdate({ period })}
        period={certification.period}
      />
      <Button onClick={onRemove} size="sm" type="button" variant="ghost">
        <Trash2Icon data-icon="inline-start" />
        Remover certificacao
      </Button>
    </FieldGroup>
  );
}
