"use client";

import { ResumeExperienceItem } from "@/features/resume/ui/resume-experience-item";
import { ResumeItemAccordion } from "@/features/resume/ui/resume-item-accordion";
import type { ResumeExperience } from "@/features/resume/types/resume-document";

type Props = {
  experiences: ResumeExperience[];
  onChange: (experiences: ResumeExperience[]) => void;
};

function createEmptyExperience(): ResumeExperience {
  return {
    id: crypto.randomUUID(),
    title: "",
    companyName: "",
    location: null,
    description: "",
    period: "",
  };
}

export function ResumeExperienceAccordion({ experiences, onChange }: Props) {
  return (
    <ResumeItemAccordion
      addLabel="Adicionar experiencia"
      createItem={createEmptyExperience}
      emptyLabel="Nenhuma experiencia cadastrada ainda."
      getSummary={(experience) => ({
        primary: experience.title || "Cargo a definir",
        secondary: experience.companyName,
      })}
      items={experiences}
      onChange={onChange}
      renderFields={(experience, update, remove) => (
        <ResumeExperienceItem
          experience={experience}
          onRemove={remove}
          onUpdate={update}
        />
      )}
    />
  );
}
