import { mapLinkedinToResume } from "@/features/linkedin/server/map-linkedin-to-resume";
import { importLinkedinProfile } from "@/features/linkedin/server/import-profile";
import { getResumeById, getResumeBySlug } from "@/features/resume/server/resume-repository";

export async function loadResumeByIdentifier(identifier: string) {
  const importedProfile = await importLinkedinProfile(identifier);
  return mapLinkedinToResume(importedProfile);
}

export async function loadOwnedResume(resumeId: string, ownerId: string) {
  const resume = await getResumeById(resumeId, ownerId);
  return resume?.documentJson ?? null;
}

export async function loadPublicResume(slug: string) {
  const resume = await getResumeBySlug(slug);
  return resume?.documentJson ?? null;
}
