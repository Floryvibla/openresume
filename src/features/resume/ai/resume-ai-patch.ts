import { z } from "zod";

import type { ResumeDocument } from "@/features/resume/types/resume-document";

export const resumeAiPatchSchema = z.object({
  headline: z
    .string()
    .describe("Titulo profissional reescrito, no idioma do curriculo."),
  summary: z
    .string()
    .describe("Resumo profissional reescrito, no idioma do curriculo."),
  experiences: z
    .array(
      z.object({
        description: z
          .string()
          .describe(
            "Descricao em bullet points: cada bullet inicia com '- ' e os itens sao separados por quebra de linha (\\n).",
          ),
      }),
    )
    .describe(
      "Descricoes reescritas com o metodo XYZ, na mesma quantidade e na mesma ordem das experiencias originais.",
    ),
  skills: z
    .array(z.string())
    .describe("Lista final de skills, sem itens duplicados."),
  certifications: z
    .array(
      z.object({
        name: z
          .string()
          .describe("Nome da certificacao na forma oficial, sem abreviacoes."),
      }),
    )
    .describe(
      "Certificacoes com o nome normalizado para a forma oficial, na mesma quantidade e na mesma ordem das originais.",
    ),
  changes: z
    .array(
      z.object({
        detail: z
          .string()
          .describe("Uma frase curta explicando o que mudou e o motivo."),
        section: z
          .string()
          .describe("Nome da secao afetada, como Resumo, Experiencia ou Skills."),
      }),
    )
    .describe("Lista das principais mudancas feitas no curriculo."),
});

export type ResumeAiPatch = z.infer<typeof resumeAiPatchSchema>;

export function applyResumeAiPatch(
  resume: ResumeDocument,
  patch: ResumeAiPatch,
): ResumeDocument {
  return {
    ...resume,
    basics: { ...resume.basics, headline: patch.headline },
    certifications: resume.certifications.map((certification, index) => ({
      ...certification,
      name: patch.certifications[index]?.name ?? certification.name,
    })),
    experiences: resume.experiences.map((experience, index) => ({
      ...experience,
      description: patch.experiences[index]?.description ?? experience.description,
    })),
    skills: patch.skills,
    summary: patch.summary,
  };
}
