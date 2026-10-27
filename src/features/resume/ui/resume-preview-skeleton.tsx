import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import {
  resumeAiSectionLabels,
  type ResumeAiSectionKey,
} from "@/features/resume/ai/resume-ai-sections";
import type { ResumeDocument } from "@/features/resume/types/resume-document";
import { ResumeHeader } from "@/features/resume/ui/resume-header";
import { ResumeSection } from "@/features/resume/ui/resume-section";
import { resumeThemeClasses } from "@/features/resume/ui/resume-theme";

const skeletonSections = [
  "Resumo",
  "Experiencia",
  "Formacao",
  "Skills",
  "Certificacoes",
  "Idiomas",
];

const skeletonLineWidths = ["w-full", "w-11/12", "w-10/12", "w-9/12"];

type Props = {
  activeSection: ResumeAiSectionKey | null;
  resume: ResumeDocument;
};

export function ResumePreviewSkeleton({ activeSection, resume }: Props) {
  const sectionLabel = activeSection
    ? ` — ${resumeAiSectionLabels[activeSection]}`
    : "...";

  return (
    <section className="flex h-full flex-col items-center gap-6 sm:px-6">
      <div className="flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm text-muted-foreground">
        <Spinner className="size-4" />
        <span>Melhorando com IA{sectionLabel}</span>
      </div>
      <article
        className={`w-full max-w-198.5 bg-white px-[7%] py-[8%] shadow-[0_18px_45px_rgba(0,0,0,0.08)] ${resumeThemeClasses[resume.theme]}`}
        style={{ aspectRatio: "210 / 297" }}
      >
        <div className="flex h-full flex-col gap-6">
          <ResumeHeader resume={resume} />
          {skeletonSections.map((title) => (
            <ResumeSection key={title} title={title}>
              <div className="flex flex-col gap-2">
                {skeletonLineWidths.map((width) => (
                  <Skeleton className={`h-3 ${width}`} key={width} />
                ))}
              </div>
            </ResumeSection>
          ))}
        </div>
      </article>
    </section>
  );
}
