import { z } from "zod";

import { resumeDocumentSchema, resumeThemeKeys } from "@/features/resume/types/resume-document";

export const createResumeSchema = z.object({
  title: z.string().min(1),
  themeKey: z.enum(resumeThemeKeys),
  documentJson: resumeDocumentSchema,
});

export const updateResumeSchema = createResumeSchema.extend({
  isPublic: z.boolean().optional(),
});

export const exportResumePdfSchema = z.object({
  documentJson: resumeDocumentSchema,
  title: z.string().min(1),
});
