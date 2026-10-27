import type { ResumeDocument } from "@/features/resume/types/resume-document";

export const maxStoredResumeVersions = 20;

export type ResumeVersion = {
  createdAt: string;
  id: string;
  label: string;
  resume: ResumeDocument;
};

export function createResumeVersion(
  resume: ResumeDocument,
  label: string,
): ResumeVersion {
  return {
    createdAt: new Date().toISOString(),
    id: crypto.randomUUID(),
    label,
    resume,
  };
}

export function addResumeVersion(
  versions: ResumeVersion[],
  version: ResumeVersion,
) {
  return [version, ...versions].slice(0, maxStoredResumeVersions);
}
