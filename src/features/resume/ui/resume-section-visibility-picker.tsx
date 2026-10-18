"use client";

import { Button } from "@/components/ui/button";
import { getResumeCopy } from "@/features/resume/ui/resume-copy";
import type { ResumeDocument } from "@/features/resume/types/resume-document";

type Props = {
  onValueChange: (value: ResumeDocument["visibleSections"]) => void;
  value: ResumeDocument["visibleSections"];
  language: ResumeDocument["language"];
};

export function ResumeSectionVisibilityPicker({ onValueChange, value, language }: Props) {
  const copy = getResumeCopy(language);
  const labels = {
    certifications: copy.certifications,
    education: copy.education,
    experiences: copy.experience,
    skills: copy.skills,
    summary: copy.summary,
  };

  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(labels).map(([sectionKey, label]) => (
        <Button
          key={sectionKey}
          onClick={() =>
            onValueChange({
              ...value,
              [sectionKey]: !value[sectionKey as keyof typeof value],
            })
          }
          size="sm"
          type="button"
          variant={value[sectionKey as keyof typeof value] ? "default" : "outline"}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
