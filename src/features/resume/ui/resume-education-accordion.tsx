"use client";

import { ResumeEducationItem } from "@/features/resume/ui/resume-education-item";
import { ResumeItemAccordion } from "@/features/resume/ui/resume-item-accordion";
import type { ResumeEducation } from "@/features/resume/types/resume-document";

type Props = {
  education: ResumeEducation[];
  onChange: (education: ResumeEducation[]) => void;
};

function createEmptyEducation(): ResumeEducation {
  return {
    id: crypto.randomUUID(),
    schoolName: "",
    degreeName: "",
    fieldOfStudy: "",
    period: "",
  };
}

export function ResumeEducationAccordion({ education, onChange }: Props) {
  return (
    <ResumeItemAccordion
      addLabel="Adicionar formacao"
      createItem={createEmptyEducation}
      emptyLabel="Nenhuma formacao cadastrada ainda."
      getSummary={(item) => ({
        primary: item.degreeName || "Curso a definir",
        secondary: item.schoolName,
      })}
      items={education}
      onChange={onChange}
      renderFields={(item, update, remove) => (
        <ResumeEducationItem
          education={item}
          onRemove={remove}
          onUpdate={update}
        />
      )}
    />
  );
}
