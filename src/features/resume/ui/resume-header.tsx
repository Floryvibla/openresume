import type { ResumeDocument } from "@/features/resume/types/resume-document";

type Props = {
  resume: ResumeDocument;
};

export function ResumeHeader({ resume }: Props) {
  const contactItems = [
    resume.basics.location,
    resume.basics.email,
    resume.basics.phone,
    `linkedin.com/in/${resume.basics.publicIdentifier}`,
  ].filter(Boolean);

  return (
    <header className="flex flex-col gap-3 border-b border-black/35 pb-5 text-center">
      <h1 className="text-[1.9rem] font-black uppercase tracking-[0.03em] text-black">
        {resume.basics.fullName}
      </h1>
      <p className="resume-accent text-[0.95rem] font-semibold">{resume.basics.headline}</p>
      <p className="text-[0.78rem] text-black/75">{contactItems.join(" | ")}</p>
    </header>
  );
}
