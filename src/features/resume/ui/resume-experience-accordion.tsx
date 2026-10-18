"use client";

import { PlusIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ResumeExperienceItem } from "@/features/resume/ui/resume-experience-item";
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
  function updateExperience(nextExperience: ResumeExperience) {
    onChange(
      experiences.map((item) =>
        item.id === nextExperience.id ? nextExperience : item,
      ),
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {experiences.length > 0 ? (
        <Accordion>
          {experiences.map((experience, index) => (
            <AccordionItem key={experience.id} value={experience.id}>
              <AccordionTrigger>
                <span className="flex flex-col gap-0.5">
                  <span>Experiencia {index + 1}</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {experience.title || "Cargo a definir"}
                    {experience.companyName ? ` · ${experience.companyName}` : ""}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <ResumeExperienceItem
                  experience={experience}
                  onChange={updateExperience}
                  onRemove={() =>
                    onChange(experiences.filter((item) => item.id !== experience.id))
                  }
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <p className="text-sm text-muted-foreground">
          Nenhuma experiencia cadastrada ainda.
        </p>
      )}
      <Button
        className="w-fit"
        onClick={() => onChange([...experiences, createEmptyExperience()])}
        size="sm"
        type="button"
        variant="outline"
      >
        <PlusIcon data-icon="inline-start" />
        Adicionar experiencia
      </Button>
    </div>
  );
}
