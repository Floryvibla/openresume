"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  resumeLanguageKeys,
  type ResumeLanguageKey,
} from "@/features/resume/types/resume-document";

const languageLabels: Record<ResumeLanguageKey, string> = {
  "pt-BR": "Português",
  en: "English",
  fr: "Français",
};

type Props = {
  onValueChange: (value: ResumeLanguageKey) => void;
  value: ResumeLanguageKey;
};

export function ResumeLanguageSelect({ onValueChange, value }: Props) {
  function handleValueChange(nextValue: ResumeLanguageKey | null) {
    if (nextValue) {
      onValueChange(nextValue);
    }
  }

  return (
    <Select onValueChange={handleValueChange} value={value}>
      <SelectTrigger className="w-full" id="resume-language">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {resumeLanguageKeys.map((languageKey) => (
          <SelectItem key={languageKey} value={languageKey}>
            {languageLabels[languageKey]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
