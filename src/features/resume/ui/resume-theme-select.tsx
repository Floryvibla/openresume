"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { resumeThemeOptions } from "@/features/resume/ui/resume-theme";
import {
  resumeThemeKeys,
  type ResumeThemeKey,
} from "@/features/resume/types/resume-document";

type Props = {
  onValueChange: (value: ResumeThemeKey) => void;
  value: ResumeThemeKey;
};

export function ResumeThemeSelect({ onValueChange, value }: Props) {
  function handleValueChange(nextValue: ResumeThemeKey | null) {
    if (nextValue) {
      onValueChange(nextValue);
    }
  }

  return (
    <Select onValueChange={handleValueChange} value={value}>
      <SelectTrigger className="w-full" id="resume-theme">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {resumeThemeKeys.map((themeKey) => (
          <SelectItem key={themeKey} value={themeKey}>
            <span className="flex items-center gap-2">
              <span
                className={`size-3 shrink-0 rounded-full ${resumeThemeOptions[themeKey].swatchClassName}`}
              />
              {resumeThemeOptions[themeKey].label}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
