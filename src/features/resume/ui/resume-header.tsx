import type { ResumeDocument } from "@/features/resume/types/resume-document";
import { formatLinkedinUrl } from "@/features/resume/ui/resume-linkedin";

type Props = {
  resume: ResumeDocument;
};

export function ResumeHeader({ resume }: Props) {
  const contactItems = [
    resume.basics.location,
    resume.basics.email,
    resume.basics.phone,
    formatLinkedinUrl(resume.basics.publicIdentifier),
  ].filter(Boolean);

  return (
    <header className="flex flex-col gap-3 border-b border-black/35 pb-5 text-center">
      <h1 className="text-3xl font-black uppercase text-black">
        {resume.basics.fullName}
      </h1>
      <p className="resume-accent font-semibold">{resume.basics.headline}</p>
      <p className="text-[0.78rem] text-gray-700">{contactItems.join(" | ")}</p>
    </header>
  );
}
