import type {
  ResumeEducation,
  ResumeExperience,
} from "@/features/resume/types/resume-document";
import { splitResumeBullets } from "@/features/resume/ui/resume-bullets";

type TimelineItemProps = {
  endLabel: string;
  subtitle: string;
  tertiary?: string | null;
  title: string;
};

function ResumeTimelineItem({
  endLabel,
  subtitle,
  tertiary,
  title,
}: TimelineItemProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
        <h3 className="text-[0.82rem] font-bold text-black">{title}</h3>
        <span className="text-[0.76rem] font-semibold text-black/70">
          {endLabel}
        </span>
      </div>
      <p className="text-[0.8rem] font-semibold text-black/80">{subtitle}</p>
      {tertiary ? (
        <p className="text-[0.78rem] text-black/75">{tertiary}</p>
      ) : null}
    </div>
  );
}

type ExperienceListProps = {
  items: ResumeExperience[];
};

export function ResumeExperienceList({ items }: ExperienceListProps) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((experience) => (
        <div className="flex flex-col gap-1.5" key={experience.id}>
          <ResumeTimelineItem
            endLabel={experience.period}
            subtitle={`${experience.companyName}${
              experience.location ? `, ${experience.location}` : ""
            }`}
            title={experience.title}
          />
          {experience.description ? (
            <ul className="grid list-disc gap-1 pl-5 text-[0.79rem] leading-6 text-black/85">
              {splitResumeBullets(experience.description).map(
                (bullet, bulletIndex) => (
                  <li key={`${experience.id}-${bulletIndex}`}>{bullet}</li>
                ),
              )}
            </ul>
          ) : null}
        </div>
      ))}
    </div>
  );
}

type EducationListProps = {
  items: ResumeEducation[];
};

export function ResumeEducationList({ items }: EducationListProps) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((education) => (
        <ResumeTimelineItem
          endLabel={education.period}
          key={education.id}
          subtitle={education.schoolName}
          tertiary={education.fieldOfStudy}
          title={education.degreeName}
        />
      ))}
    </div>
  );
}
