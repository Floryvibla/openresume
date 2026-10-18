import type { ResumeThemeKey } from "@/features/resume/types/resume-document";

export const resumeThemeClasses: Record<ResumeThemeKey, string> = {
  olive: "[&_.resume-accent]:text-[#556b17]",
  forest: "[&_.resume-accent]:text-[#1f3f2f]",
  sand: "[&_.resume-accent]:text-[#9c6a2f]",
};
