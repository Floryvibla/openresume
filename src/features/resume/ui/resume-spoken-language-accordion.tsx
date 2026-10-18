"use client";

import { ResumeItemAccordion } from "@/features/resume/ui/resume-item-accordion";
import { ResumeSpokenLanguageItem } from "@/features/resume/ui/resume-spoken-language-item";
import type { ResumeSpokenLanguage } from "@/features/resume/types/resume-document";

type Props = {
  languages: ResumeSpokenLanguage[];
  onChange: (languages: ResumeSpokenLanguage[]) => void;
};

function createEmptyLanguage(): ResumeSpokenLanguage {
  return {
    id: crypto.randomUUID(),
    name: "",
    proficiency: "",
  };
}

export function ResumeSpokenLanguageAccordion({ languages, onChange }: Props) {
  return (
    <ResumeItemAccordion
      addLabel="Adicionar idioma"
      createItem={createEmptyLanguage}
      emptyLabel="Nenhum idioma cadastrado ainda."
      getSummary={(item) => ({
        primary: item.name || "Idioma a definir",
        secondary: item.proficiency,
      })}
      items={languages}
      onChange={onChange}
      renderFields={(item, update, remove) => (
        <ResumeSpokenLanguageItem
          language={item}
          onRemove={remove}
          onUpdate={update}
        />
      )}
    />
  );
}
