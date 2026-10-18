"use client";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { ResumeLanguageSelect } from "@/features/resume/ui/resume-language-select";
import { ResumeThemeSelect } from "@/features/resume/ui/resume-theme-select";
import type { ResumeDocument } from "@/features/resume/types/resume-document";

type Props = {
  language: ResumeDocument["language"];
  onLanguageChange: (language: ResumeDocument["language"]) => void;
  onThemeChange: (theme: ResumeDocument["theme"]) => void;
  theme: ResumeDocument["theme"];
};

export function ResumeEditorPreferences({
  language,
  onLanguageChange,
  onThemeChange,
  theme,
}: Props) {
  return (
    <FieldGroup className="gap-4 md:grid md:grid-cols-2">
      <Field>
        <FieldLabel htmlFor="resume-language">Idioma</FieldLabel>
        <ResumeLanguageSelect onValueChange={onLanguageChange} value={language} />
      </Field>
      <Field>
        <FieldLabel htmlFor="resume-theme">Cor</FieldLabel>
        <ResumeThemeSelect onValueChange={onThemeChange} value={theme} />
      </Field>
    </FieldGroup>
  );
}
