import type { ResumeLanguageKey } from "@/features/resume/types/resume-document";

type ResumeCopy = {
  certifications: string;
  education: string;
  experience: string;
  languages: string;
  page: string;
  pages: string;
  skills: string;
  summary: string;
};

const copyByLanguage: Record<ResumeLanguageKey, ResumeCopy> = {
  "pt-BR": {
    certifications: "Certificações",
    education: "Formação",
    experience: "Experiência",
    languages: "Idiomas",
    page: "Página",
    pages: "páginas",
    skills: "Skills",
    summary: "Resumo profissional",
  },
  en: {
    certifications: "Certifications",
    education: "Education",
    experience: "Work experience",
    languages: "Languages",
    page: "Page",
    pages: "pages",
    skills: "Skills",
    summary: "Professional summary",
  },
  fr: {
    certifications: "Certifications",
    education: "Formation",
    experience: "Expérience",
    languages: "Langues",
    page: "Page",
    pages: "pages",
    skills: "Compétences",
    summary: "Résumé professionnel",
  },
};

export function getResumeCopy(language: ResumeLanguageKey) {
  return copyByLanguage[language];
}
