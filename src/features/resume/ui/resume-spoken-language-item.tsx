"use client";

import { Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { ResumeSpokenLanguage } from "@/features/resume/types/resume-document";

type Props = {
  language: ResumeSpokenLanguage;
  onRemove: () => void;
  onUpdate: (partial: Partial<ResumeSpokenLanguage>) => void;
};

export function ResumeSpokenLanguageItem({ language, onRemove, onUpdate }: Props) {
  return (
    <FieldGroup className="px-1 pt-2 pb-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Field>
          <FieldLabel htmlFor={`language-name-${language.id}`}>
            Idioma
          </FieldLabel>
          <Input
            id={`language-name-${language.id}`}
            onChange={(event) => onUpdate({ name: event.target.value })}
            placeholder="Ex.: Ingles"
            value={language.name}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor={`language-level-${language.id}`}>
            Nivel
          </FieldLabel>
          <Input
            id={`language-level-${language.id}`}
            onChange={(event) => onUpdate({ proficiency: event.target.value })}
            placeholder="Ex.: Avancado"
            value={language.proficiency}
          />
        </Field>
      </div>
      <Button onClick={onRemove} size="sm" type="button" variant="ghost">
        <Trash2Icon data-icon="inline-start" />
        Remover idioma
      </Button>
    </FieldGroup>
  );
}
