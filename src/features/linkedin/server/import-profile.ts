import {
  extractProfileIdLinkedin,
  getLinkedinCertifications,
  getLinkedinEducation,
  getLinkedinExperiences,
  getLinkedinSkills,
  getProfileSectionAbout,
  getUserMiniProfile,
} from "@florydev/linkedin-api-voyager";

import {
  LinkedinImportInputError,
  LinkedinImportRateLimitError,
  LinkedinImportSessionError,
} from "@/features/linkedin/server/linkedin-errors";
import { initializeLinkedinClient } from "@/features/linkedin/server/linkedin-client";
import { type LinkedinExperienceGroup } from "@/features/linkedin/server/linkedin-experience-types";

export type ImportedLinkedinProfile = Awaited<ReturnType<typeof importLinkedinProfile>>;

async function resolvePublicIdentifier(input: string) {
  const trimmedInput = input.trim();

  if (!trimmedInput) {
    throw new LinkedinImportInputError();
  }

  if (!trimmedInput.includes("linkedin.com/")) {
    return trimmedInput.replace(/^@/, "");
  }

  const extractedIdentifier = await extractProfileIdLinkedin(trimmedInput);

  if (!extractedIdentifier) {
    throw new LinkedinImportInputError();
  }

  return extractedIdentifier;
}

function normalizeImportError(error: unknown) {
  const errorMessage = error instanceof Error ? error.message.toLowerCase() : "";

  if (errorMessage.includes("redirect") || errorMessage.includes("401")) {
    throw new LinkedinImportSessionError();
  }

  if (errorMessage.includes("403")) {
    throw new LinkedinImportRateLimitError();
  }

  throw error;
}

export async function importLinkedinProfile(input: string) {
  try {
    initializeLinkedinClient();
    const publicIdentifier = await resolvePublicIdentifier(input);

    const [profile, about, experiences, skills, education, certifications] =
      await Promise.all([
        getUserMiniProfile(publicIdentifier),
        getProfileSectionAbout(publicIdentifier),
        getLinkedinExperiences(publicIdentifier, { count: 20 }),
        getLinkedinSkills(publicIdentifier, { count: 20 }),
        getLinkedinEducation(publicIdentifier, { count: 10 }),
        getLinkedinCertifications(publicIdentifier, { count: 10 }),
      ]);

    return {
      publicIdentifier,
      profile,
      about,
      experienceGroups: (experiences.items ?? []) as LinkedinExperienceGroup[],
      skills: skills.items,
      education: education.items,
      certifications: certifications.items,
    };
  } catch (error) {
    normalizeImportError(error);
    throw error;
  }
}
