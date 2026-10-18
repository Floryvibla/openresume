"use client";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { ResumeDocument } from "@/features/resume/types/resume-document";

type ResumeBasics = ResumeDocument["basics"];

type Props = {
  basics: ResumeBasics;
  onBasicsChange: (basics: ResumeBasics) => void;
  onTitleChange: (title: string) => void;
  title: string;
};

export function ResumeBasicsFields({
  basics,
  onBasicsChange,
  onTitleChange,
  title,
}: Props) {
  function updateBasics(partial: Partial<ResumeBasics>) {
    onBasicsChange({ ...basics, ...partial });
  }

  return (
    <FieldGroup>
      <div className="grid gap-4 md:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="resume-title">Titulo interno</FieldLabel>
          <Input
            id="resume-title"
            onChange={(event) => onTitleChange(event.target.value)}
            value={title}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="resume-name">Nome completo</FieldLabel>
          <Input
            id="resume-name"
            onChange={(event) => updateBasics({ fullName: event.target.value })}
            value={basics.fullName}
          />
        </Field>
      </div>
      <Field>
        <FieldLabel htmlFor="resume-headline">Headline</FieldLabel>
        <Input
          id="resume-headline"
          onChange={(event) => updateBasics({ headline: event.target.value })}
          value={basics.headline}
        />
      </Field>
      <div className="grid gap-4 md:grid-cols-3">
        <Field>
          <FieldLabel htmlFor="resume-location">Localizacao</FieldLabel>
          <Input
            id="resume-location"
            onChange={(event) => updateBasics({ location: event.target.value })}
            value={basics.location}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="resume-email">Email</FieldLabel>
          <Input
            id="resume-email"
            onChange={(event) => updateBasics({ email: event.target.value })}
            value={basics.email}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="resume-phone">Telefone</FieldLabel>
          <Input
            id="resume-phone"
            onChange={(event) => updateBasics({ phone: event.target.value })}
            value={basics.phone}
          />
        </Field>
      </div>
    </FieldGroup>
  );
}
