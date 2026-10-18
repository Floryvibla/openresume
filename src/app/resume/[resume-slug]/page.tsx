import { notFound } from "next/navigation";

import { loadPublicResume } from "@/features/resume/server/load-resume";
import { ResumePreview } from "@/features/resume/ui/resume-preview";

type ResumeSlugPageProps = {
  params: Promise<{ "resume-slug": string }>;
};

export default async function ResumeSlugPage({ params }: ResumeSlugPageProps) {
  const { "resume-slug": resumeSlug } = await params;
  const resume = await loadPublicResume(resumeSlug);

  if (!resume) {
    notFound();
  }

  return (
    <main className="page-shell">
      <ResumePreview resume={resume} />
    </main>
  );
}
