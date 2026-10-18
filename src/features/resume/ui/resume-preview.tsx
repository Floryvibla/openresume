import { ResumeHeader } from "@/features/resume/ui/resume-header";
import { buildResumePages } from "@/features/resume/ui/resume-pagination";
import { ResumeSection } from "@/features/resume/ui/resume-section";
import { getResumeCopy } from "@/features/resume/ui/resume-copy";
import { resumeThemeClasses } from "@/features/resume/ui/resume-theme";
import type { ResumeDocument } from "@/features/resume/types/resume-document";

type Props = {
  resume: ResumeDocument;
};

function renderBlock(resume: ResumeDocument, block: ReturnType<typeof buildResumePages>[number]["blocks"][number]) {
  if (block.key === "summary" && block.text) {
    return (
      <ResumeSection title={block.title}>
        <p className="text-[0.8rem] leading-6 text-black/85">{block.text}</p>
      </ResumeSection>
    );
  }

  if (block.key === "experiences") {
    const items = resume.experiences.filter((item) => block.items?.includes(item.id));
    return (
      <ResumeSection title={block.title}>
        <div className="flex flex-col gap-4">
          {items.map((experience) => (
            <div className="flex flex-col gap-1.5" key={experience.id}>
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                <h3 className="text-[0.82rem] font-bold text-black">{experience.title}</h3>
                <span className="text-[0.76rem] font-semibold text-black/70">{experience.period}</span>
              </div>
              <p className="text-[0.8rem] font-semibold text-black/80">
                {experience.companyName}
                {experience.location ? `, ${experience.location}` : ""}
              </p>
              {experience.description ? (
                <p className="text-[0.79rem] leading-6 text-black/85">{experience.description}</p>
              ) : null}
            </div>
          ))}
        </div>
      </ResumeSection>
    );
  }

  if (block.key === "education") {
    const items = resume.education.filter((item) => block.items?.includes(item.id));
    return (
      <ResumeSection title={block.title}>
        <div className="flex flex-col gap-3">
          {items.map((education) => (
            <div className="flex flex-col gap-1" key={education.id}>
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                <h3 className="text-[0.82rem] font-bold text-black">{education.degreeName}</h3>
                <span className="text-[0.76rem] font-semibold text-black/70">{education.period}</span>
              </div>
              <p className="text-[0.8rem] font-semibold text-black/80">{education.schoolName}</p>
              {education.fieldOfStudy ? (
                <p className="text-[0.78rem] text-black/75">{education.fieldOfStudy}</p>
              ) : null}
            </div>
          ))}
        </div>
      </ResumeSection>
    );
  }

  if (block.key === "skills") {
    const items = resume.skills.filter((item) => block.items?.includes(item));
    return (
      <ResumeSection title={block.title}>
        <ul className="grid list-disc gap-1 pl-5 text-[0.8rem] text-black/85 sm:grid-cols-2">
          {items.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </ResumeSection>
    );
  }

  const items = resume.certifications.filter((item) => block.items?.includes(item.id));
  return (
    <ResumeSection title={block.title}>
      <ul className="grid list-disc gap-1 pl-5 text-[0.8rem] text-black/85">
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

export function ResumePreview({ resume }: Props) {
  const pages = buildResumePages(resume);
  const copy = getResumeCopy(resume.language);

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-sm font-medium text-muted-foreground">
          {pages.length} {pages.length > 1 ? copy.pages : copy.page.toLowerCase()}
        </p>
      </div>
      <div className="flex flex-col items-center gap-6 rounded-[32px] bg-muted/40 px-3 py-4 sm:px-6">
        {pages.map((page) => (
          <article
            className={`w-full max-w-[794px] bg-white px-[7%] py-[8%] text-black shadow-[0_18px_45px_rgba(0,0,0,0.08)] ${resumeThemeClasses[resume.theme]}`}
            key={page.pageNumber}
            style={{ aspectRatio: "210 / 297" }}
          >
            <div className="flex h-full flex-col gap-6">
              {page.pageNumber === 1 ? <ResumeHeader resume={resume} /> : null}
              {page.blocks.map((block, index) => (
                <div key={`${block.key}-${index}`}>{renderBlock(resume, block)}</div>
              ))}
              <div className="mt-auto pt-4 text-right text-[0.7rem] text-black/60">
                {copy.page} {page.pageNumber} / {pages.length}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
