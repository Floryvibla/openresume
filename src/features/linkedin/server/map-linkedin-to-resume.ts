import { randomUUID } from "node:crypto";

import type { ImportedLinkedinProfile } from "@/features/linkedin/server/import-profile";
import type {
  LinkedinExperienceGroup,
  LinkedinPeriod,
  LinkedinPeriodDatePart,
} from "@/features/linkedin/server/linkedin-experience-types";
import {
  type ResumeDocument,
  type ResumeThemeKey,
  resumeDocumentSchema,
} from "@/features/resume/types/resume-document";

function formatDatePart(part?: LinkedinPeriodDatePart) {
  if (!part?.year) {
    return null;
  }

  const monthLabel = part.month
    ? `${String(part.month).padStart(2, "0")}/`
    : "";
  return `${monthLabel}${part.year}`;
}

function formatPeriod(period?: LinkedinPeriod) {
  if (!period) {
    return "Periodo nao informado";
  }

  const startLabel = formatDatePart(period.start);
  const endLabel = formatDatePart(period.end) ?? "Atual";

  if (!startLabel && !period.end) {
    return "Periodo nao informado";
  }

  return [startLabel ?? "Inicio", endLabel].join(" - ");
}

function createSummary(importedProfile: ImportedLinkedinProfile) {
  if (importedProfile.about?.trim()) {
    return importedProfile.about.trim();
  }

  return `${importedProfile.profile.fullName} atua como ${importedProfile.profile.headline}.`;
}

function mapExperiences(
  experienceGroups: LinkedinExperienceGroup[],
): ResumeDocument["experiences"] {
  return experienceGroups.flatMap((group) =>
    (group.positions ?? []).map((position) => ({
      id: randomUUID(),
      title: position.title ?? "Cargo nao informado",
      companyName:
        position.companyName ?? group.companyName ?? "Empresa nao informada",
      location: position.locationName ?? null,
      description: position.description ?? null,
      period: formatPeriod(position.timePeriod ?? group.timePeriod),
    })),
  );
}

export function mapLinkedinToResume(
  importedProfile: ImportedLinkedinProfile,
  theme: ResumeThemeKey = "basic",
): ResumeDocument {
  const resumeDocument = {
    basics: {
      fullName: importedProfile.profile.fullName,
      headline: importedProfile.profile.headline,
      publicIdentifier: importedProfile.publicIdentifier,
      profilePicture: importedProfile.profile.profilePicture,
      location:
        importedProfile.experienceGroups[0]?.positions?.[0]?.locationName ??
        "Localizacao nao informada",
      email: "",
      phone: "",
    },
    summary: createSummary(importedProfile),
    language: "pt-BR",
    theme,
    visibleSections: {
      summary: true,
      experiences: true,
      education: true,
      skills: true,
      certifications: true,
      languages: true,
    },
    generatedAt: {
      label: new Date().toLocaleDateString("pt-BR"),
    },
    experiences: mapExperiences(importedProfile.experienceGroups),
    skills: importedProfile.skills.map((item) => item.name).filter(Boolean),
    education: importedProfile.education.map((item) => ({
      id: randomUUID(),
      schoolName: item.schoolName,
      degreeName: item.degreeName,
      fieldOfStudy: item.fieldOfStudy,
      period: formatPeriod(item.timePeriod),
    })),
    certifications: importedProfile.certifications.map((item) => ({
      id: randomUUID(),
      name: item.name,
      issuer: item.authority ?? "Autoridade nao informada",
      period: formatPeriod(item.timePeriod),
    })),
    languages: [],
  };

  return resumeDocumentSchema.parse(resumeDocument);
}
