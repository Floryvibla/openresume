"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  resumeThemeKeys,
  type ResumeThemeKey,
} from "@/features/resume/types/resume-document";

const labels: Record<ResumeThemeKey, string> = {
  basic: "Basic",
  forest: "Forest",
  sand: "Sand",
};

type Props = {
  onValueChange: (value: ResumeThemeKey) => void;
  value: ResumeThemeKey;
};

export function ThemeColorPicker({ onValueChange, value }: Props) {
  return (
    <ToggleGroup
      multiple={false}
      onValueChange={(nextValue) => {
        if (nextValue[0]) {
          onValueChange(nextValue[0] as ResumeThemeKey);
        }
      }}
      value={[value]}
      variant="outline"
    >
      {resumeThemeKeys.map((themeKey) => (
        <ToggleGroupItem key={themeKey} value={themeKey}>
          {labels[themeKey]}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
