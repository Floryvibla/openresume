import type { ResumeDocument, ResumeThemeKey } from "@/features/resume/types/resume-document";

export type StoredResume = {
  id: string;
  ownerId: string;
  title: string;
  resumeSlug: string;
  documentJson: ResumeDocument;
  themeKey: ResumeThemeKey;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
};
