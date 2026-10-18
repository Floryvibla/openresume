import { z } from "zod";

export const resumeThemeKeys = ["olive", "forest", "sand"] as const;
export const resumeLanguageKeys = ["pt-BR", "en", "fr"] as const;

const resumeDateSchema = z.object({
  label: z.string(),
});

const resumeExperienceSchema = z.object({
  id: z.string(),
  title: z.string(),
  companyName: z.string(),
  location: z.string().nullable(),
  description: z.string().nullable(),
  period: z.string(),
});

const resumeEducationSchema = z.object({
  id: z.string(),
  schoolName: z.string(),
  degreeName: z.string(),
  fieldOfStudy: z.string().nullable(),
  period: z.string(),
});

const resumeCertificationSchema = z.object({
  id: z.string(),
  name: z.string(),
  issuer: z.string(),
  period: z.string(),
});

export const resumeDocumentSchema = z.object({
  basics: z.object({
    fullName: z.string(),
    headline: z.string().default(""),
    publicIdentifier: z.string(),
    profilePicture: z.string().nullable().default(null),
    location: z.string().default(""),
    email: z.string().default(""),
    phone: z.string().default(""),
  }),
  summary: z.string(),
  language: z.enum(resumeLanguageKeys).default("pt-BR"),
  theme: z.enum(resumeThemeKeys).default("olive"),
  visibleSections: z.object({
    summary: z.boolean().default(true),
    experiences: z.boolean().default(true),
    education: z.boolean().default(true),
    skills: z.boolean().default(true),
    certifications: z.boolean().default(true),
  }).default({
    summary: true,
    experiences: true,
    education: true,
    skills: true,
    certifications: true,
  }),
  generatedAt: resumeDateSchema,
  experiences: z.array(resumeExperienceSchema),
  skills: z.array(z.string()),
  education: z.array(resumeEducationSchema),
  certifications: z.array(resumeCertificationSchema),
});

export type ResumeThemeKey = (typeof resumeThemeKeys)[number];
export type ResumeLanguageKey = (typeof resumeLanguageKeys)[number];
export type ResumeDocument = z.infer<typeof resumeDocumentSchema>;
export type ResumeExperience = z.infer<typeof resumeExperienceSchema>;
export type ResumeEducation = z.infer<typeof resumeEducationSchema>;
export type ResumeCertification = z.infer<typeof resumeCertificationSchema>;
