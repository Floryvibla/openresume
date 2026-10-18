"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  resumeLanguageKeys,
  type ResumeLanguageKey,
} from "@/features/resume/types/resume-document";

const labels: Record<ResumeLanguageKey, string> = {
  "pt-BR": "PT",
  en: "EN",
  fr: "FR",
};

type Props = {
  onValueChange: (value: ResumeLanguageKey) => void;
  value: ResumeLanguageKey;
};

export function ResumeLanguagePicker({ onValueChange, value }: Props) {
  return (
    <ToggleGroup
      multiple={false}
      onValueChange={(nextValue) => {
        if (nextValue[0]) {
          onValueChange(nextValue[0] as ResumeLanguageKey);
        }
      }}
      value={[value]}
      variant="outline"
    >
      {resumeLanguageKeys.map((languageKey) => (
        <ToggleGroupItem key={languageKey} value={languageKey}>
          {labels[languageKey]}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
