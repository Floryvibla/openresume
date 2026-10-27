export const resumeAiSectionKeys = [
  "headline",
  "summary",
  "experiences",
  "skills",
  "certifications",
  "changes",
] as const;

export type ResumeAiSectionKey = (typeof resumeAiSectionKeys)[number];

export const resumeAiSectionLabels: Record<ResumeAiSectionKey, string> = {
  certifications: "Certificacoes",
  changes: "Revisao final",
  experiences: "Experiencias",
  headline: "Titulo",
  skills: "Skills",
  summary: "Resumo",
};

export function isResumeAiSectionKey(key: string): key is ResumeAiSectionKey {
  return resumeAiSectionKeys.includes(key as ResumeAiSectionKey);
}
