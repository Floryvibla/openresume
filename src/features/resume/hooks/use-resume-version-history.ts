"use client";

import { useLocalStorage } from "usehooks-ts";

import {
  addResumeVersion,
  createResumeVersion,
  type ResumeVersion,
} from "@/features/resume/ai/resume-version";
import type { ResumeDocument } from "@/features/resume/types/resume-document";

export function useResumeVersionHistory(storageKey: string) {
  const [versions, setVersions] = useLocalStorage<ResumeVersion[]>(
    storageKey,
    [],
  );

  function saveVersion(resume: ResumeDocument, label: string) {
    setVersions((currentVersions) =>
      addResumeVersion(currentVersions, createResumeVersion(resume, label)),
    );
  }

  return { saveVersion, versions };
}
