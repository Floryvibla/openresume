import { ResumeHeader } from "@/features/resume/ui/resume-header";
import { buildResumePages } from "@/features/resume/ui/resume-pagination";
import { ResumeSection } from "@/features/resume/ui/resume-section";
import {
  ResumeEducationList,
  ResumeExperienceList,
} from "@/features/resume/ui/resume-preview-timeline";
import { resumeThemeClasses } from "@/features/resume/ui/resume-theme";
import type { ResumeDocument } from "@/features/resume/types/resume-document";

type Props = {
  resume: ResumeDocument;
};

function renderBlock(
  resume: ResumeDocument,
  block: ReturnType<typeof buildResumePages>[number]["blocks"][number],
) {
  const bulletClassName =
    "grid list-disc gap-1 pl-5 text-[0.8rem] text-black/85";

  if (block.key === "summary" && block.text) {
    return (
      <ResumeSection title={block.title}>
        <p className="text-[0.8rem] leading-6 text-black/85">{block.text}</p>
      </ResumeSection>
    );
  }

  if (block.key === "experiences") {
    const items = resume.experiences.filter((item) =>
      block.items?.includes(item.id),
    );
    return (
      <ResumeSection title={block.title}>
        <ResumeExperienceList items={items} />
      </ResumeSection>
    );
  }

  if (block.key === "education") {
    const items = resume.education.filter((item) =>
      block.items?.includes(item.id),
    );
    return (
      <ResumeSection title={block.title}>
        <ResumeEducationList items={items} />
      </ResumeSection>
    );
  }

  if (block.key === "skills") {
    const items = resume.skills.filter((item) => block.items?.includes(item));
    return (
      <ResumeSection title={block.title}>
        <ul className={`${bulletClassName} sm:grid-cols-2`}>
          {items.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </ResumeSection>
    );
  }

  if (block.key === "certifications") {
    const items = resume.certifications.filter((item) =>
      block.items?.includes(item.id),
    );
    return (
      <ResumeSection title={block.title}>
        <ul className={bulletClassName}>
          {items.map((certification) => (
            <li key={certification.id}>
              {certification.name}
              {certification.issuer ? ` · ${certification.issuer}` : ""}
            </li>
          ))}
        </ul>
      </ResumeSection>
    );
  }

  if (block.key === "languages") {
    const items = resume.languages.filter((item) =>
      block.items?.includes(item.id),
    );
    return (
      <ResumeSection title={block.title}>
        <ul className={bulletClassName}>
          {items.map((language) => (
            <li key={language.id}>
              {language.name}
              {language.proficiency ? ` · ${language.proficiency}` : ""}
            </li>
          ))}
        </ul>
      </ResumeSection>
    );
  }

  return null;
}

export function ResumePreview({ resume }: Props) {
  const pages = buildResumePages(resume);

  return (
    <section className="flex h-full flex-col items-center gap-6 sm:px-6">
      {pages.map((page) => (
        <article
          className={`w-full max-w-198.5 bg-white px-[7%] py-[8%] text-black shadow-[0_18px_45px_rgba(0,0,0,0.08)] ${resumeThemeClasses[resume.theme]}`}
          key={page.pageNumber}
          style={{ aspectRatio: "210 / 297" }}
        >
          <div className="flex h-full flex-col gap-6">
            {page.pageNumber === 1 ? <ResumeHeader resume={resume} /> : null}
            {page.blocks.map((block, index) => (
              <div key={`${block.key}-${index}`}>
                {renderBlock(resume, block)}
              </div>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}
