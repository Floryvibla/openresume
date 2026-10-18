"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  composeResumePeriod,
  parseResumePeriod,
  type ResumePeriodParts,
} from "@/features/resume/ui/resume-period";

type Props = {
  id: string;
  onChange: (period: string) => void;
  period: string;
};

export function ResumeExperiencePeriod({ id, onChange, period }: Props) {
  const parts = parseResumePeriod(period);

  function updateParts(partial: Partial<ResumePeriodParts>) {
    onChange(composeResumePeriod({ ...parts, ...partial }));
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <Field>
          <FieldLabel htmlFor={`experience-start-${id}`}>Inicio</FieldLabel>
          <Input
            id={`experience-start-${id}`}
            onChange={(event) => updateParts({ start: event.target.value })}
            placeholder="MM/AAAA"
            value={parts.start}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor={`experience-end-${id}`}>Fim</FieldLabel>
          <Input
            disabled={parts.isCurrent}
            id={`experience-end-${id}`}
            onChange={(event) => updateParts({ end: event.target.value })}
            placeholder="MM/AAAA"
            value={parts.isCurrent ? "" : parts.end}
          />
        </Field>
      </div>
      <Field>
        <FieldLabel>
          <Checkbox
            checked={parts.isCurrent}
            onCheckedChange={(checked) => updateParts({ isCurrent: checked })}
          />
          Trabalho aqui atualmente
        </FieldLabel>
      </Field>
    </>
  );
}
