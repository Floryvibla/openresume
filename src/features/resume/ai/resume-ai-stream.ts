import { z } from "zod";

import { resumeAiPatchSchema } from "@/features/resume/ai/resume-ai-patch";
import { resumeAiSectionKeys } from "@/features/resume/ai/resume-ai-sections";

export const resumeAiStreamEventSchema = z.discriminatedUnion("type", [
  z.object({
    section: z.enum(resumeAiSectionKeys),
    type: z.literal("progress"),
  }),
  z.object({ patch: resumeAiPatchSchema, type: z.literal("done") }),
  z.object({ message: z.string(), type: z.literal("error") }),
]);

export type ResumeAiStreamEvent = z.infer<typeof resumeAiStreamEventSchema>;

export function parseResumeAiStreamEvent(line: string): ResumeAiStreamEvent | null {
  const trimmedLine = line.trim();

  if (!trimmedLine) {
    return null;
  }

  try {
    const parsedEvent = resumeAiStreamEventSchema.safeParse(
      JSON.parse(trimmedLine),
    );

    return parsedEvent.success ? parsedEvent.data : null;
  } catch {
    return null;
  }
}
