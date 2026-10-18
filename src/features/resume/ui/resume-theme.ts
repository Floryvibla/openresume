import type { ResumeThemeKey } from "@/features/resume/types/resume-document";

export const resumeThemeClasses: Record<ResumeThemeKey, string> = {
  basic: "[&_.resume-accent]:text-[#000]",
  forest: "[&_.resume-accent]:text-[#1f3f2f]",
  sand: "[&_.resume-accent]:text-[#9c6a2f]",
};

export const resumeThemeOptions: Record<
  ResumeThemeKey,
  { label: string; swatchClassName: string }
> = {
  basic: { label: "Basic", swatchClassName: "bg-[#000]" },
  forest: { label: "Forest", swatchClassName: "bg-[#1f3f2f]" },
  sand: { label: "Sand", swatchClassName: "bg-[#9c6a2f]" },
};
