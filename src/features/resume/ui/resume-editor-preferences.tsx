"use client";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { ResumeLanguagePicker } from "@/features/resume/ui/resume-language-picker";
import { ResumeSectionVisibilityPicker } from "@/features/resume/ui/resume-section-visibility-picker";
import { ThemeColorPicker } from "@/features/resume/ui/theme-color-picker";
import type { ResumeDocument } from "@/features/resume/types/resume-document";

type Props = {
  language: ResumeDocument["language"];
  onLanguageChange: (language: ResumeDocument["language"]) => void;
  onThemeChange: (theme: ResumeDocument["theme"]) => void;
  onVisibleSectionsChange: (
    visibleSections: ResumeDocument["visibleSections"],
  ) => void;
  theme: ResumeDocument["theme"];
  visibleSections: ResumeDocument["visibleSections"];
};

export function ResumeEditorPreferences({
  language,
  onLanguageChange,
  onThemeChange,
  onVisibleSectionsChange,
  theme,
  visibleSections,
}: Props) {
  return (
    <FieldGroup>
      <Field>
        <FieldLabel>Idioma</FieldLabel>
        <ResumeLanguagePicker
          onValueChange={onLanguageChange}
          value={language}
        />
      </Field>
      <Field>
        <FieldLabel>Secoes visiveis</FieldLabel>
        <ResumeSectionVisibilityPicker
          language={language}
          onValueChange={onVisibleSectionsChange}
          value={visibleSections}
        />
      </Field>
      <Field>
        <FieldLabel>Cor</FieldLabel>
        <ThemeColorPicker onValueChange={onThemeChange} value={theme} />
      </Field>
    </FieldGroup>
  );
}
