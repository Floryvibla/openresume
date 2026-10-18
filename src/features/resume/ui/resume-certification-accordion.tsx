"use client";

import { ResumeCertificationItem } from "@/features/resume/ui/resume-certification-item";
import { ResumeItemAccordion } from "@/features/resume/ui/resume-item-accordion";
import type { ResumeCertification } from "@/features/resume/types/resume-document";

type Props = {
  certifications: ResumeCertification[];
  onChange: (certifications: ResumeCertification[]) => void;
};

function createEmptyCertification(): ResumeCertification {
  return {
    id: crypto.randomUUID(),
    name: "",
    issuer: "",
    period: "",
  };
}

export function ResumeCertificationAccordion({
  certifications,
  onChange,
}: Props) {
  return (
    <ResumeItemAccordion
      addLabel="Adicionar certificacao"
      createItem={createEmptyCertification}
      emptyLabel="Nenhuma certificacao cadastrada ainda."
      getSummary={(item) => ({
        primary: item.name || "Certificacao a definir",
        secondary: item.issuer,
      })}
      items={certifications}
      onChange={onChange}
      renderFields={(item, update, remove) => (
        <ResumeCertificationItem
          certification={item}
          onRemove={remove}
          onUpdate={update}
        />
      )}
    />
  );
}
