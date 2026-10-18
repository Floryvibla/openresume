"use client";

import { Accordion } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { ResumeCertificationAccordion } from "@/features/resume/ui/resume-certification-accordion";
import { ResumeEducationAccordion } from "@/features/resume/ui/resume-education-accordion";
import { ResumeExperienceAccordion } from "@/features/resume/ui/resume-experience-accordion";
import { ResumeSectionAccordion } from "@/features/resume/ui/resume-section-accordion";
import { ResumeSkillsInput } from "@/features/resume/ui/resume-skills-input";
import { ResumeSpokenLanguageAccordion } from "@/features/resume/ui/resume-spoken-language-accordion";
import { getResumeCopy } from "@/features/resume/ui/resume-copy";
import type { ResumeDocument } from "@/features/resume/types/resume-document";

type Props = {
  onChange: (partial: Partial<ResumeDocument>) => void;
  resume: ResumeDocument;
};

export function ResumeEditorSections({ onChange, resume }: Props) {
  const copy = getResumeCopy(resume.language);

  function updateVisibility(
    sectionKey: keyof ResumeDocument["visibleSections"],
    isVisible: boolean,
  ) {
    onChange({
      visibleSections: { ...resume.visibleSections, [sectionKey]: isVisible },
    });
  }

  function visibilityProps(
    sectionKey: keyof ResumeDocument["visibleSections"],
  ) {
    return {
      isVisible: resume.visibleSections[sectionKey],
      onVisibilityChange: (isVisible: boolean) =>
        updateVisibility(sectionKey, isVisible),
    };
  }

  return (
    <Accordion className="rounded-lg border px-4">
      <ResumeSectionAccordion
        title={copy.summary}
        {...visibilityProps("summary")}
      >
        <Textarea
          id="resume-summary"
          onChange={(event) => onChange({ summary: event.target.value })}
          rows={4}
          value={resume.summary}
        />
      </ResumeSectionAccordion>
      <ResumeSectionAccordion
        title={copy.skills}
        {...visibilityProps("skills")}
      >
        <ResumeSkillsInput
          onChange={(skills) => onChange({ skills })}
          value={resume.skills}
        />
      </ResumeSectionAccordion>
      <ResumeSectionAccordion
        title={copy.experience}
        {...visibilityProps("experiences")}
      >
        <ResumeExperienceAccordion
          experiences={resume.experiences}
          onChange={(experiences) => onChange({ experiences })}
        />
      </ResumeSectionAccordion>
      <ResumeSectionAccordion
        title={copy.education}
        {...visibilityProps("education")}
      >
        <ResumeEducationAccordion
          education={resume.education}
          onChange={(education) => onChange({ education })}
        />
      </ResumeSectionAccordion>
      <ResumeSectionAccordion
        title={copy.certifications}
        {...visibilityProps("certifications")}
      >
        <ResumeCertificationAccordion
          certifications={resume.certifications}
          onChange={(certifications) => onChange({ certifications })}
        />
      </ResumeSectionAccordion>
      <ResumeSectionAccordion
        title={copy.languages}
        {...visibilityProps("languages")}
      >
        <ResumeSpokenLanguageAccordion
          languages={resume.languages}
          onChange={(languages) => onChange({ languages })}
        />
      </ResumeSectionAccordion>
    </Accordion>
  );
}
