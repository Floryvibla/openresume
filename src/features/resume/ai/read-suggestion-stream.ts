import type { ResumeAiPatch } from "@/features/resume/ai/resume-ai-patch";
import type { ResumeAiSectionKey } from "@/features/resume/ai/resume-ai-sections";
import { parseResumeAiStreamEvent } from "@/features/resume/ai/resume-ai-stream";

export async function readSuggestionStream(
  body: ReadableStream<Uint8Array>,
  onSectionProgress: (section: ResumeAiSectionKey) => void,
) {
  const reader = body.getReader();
  const textDecoder = new TextDecoder();
  let buffer = "";
  let patch: ResumeAiPatch | null = null;

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      buffer += textDecoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        const event = parseResumeAiStreamEvent(line);

        if (event?.type === "progress") {
          onSectionProgress(event.section);
        }

        if (event?.type === "done") {
          patch = event.patch;
        }

        if (event?.type === "error") {
          throw new Error(event.message);
        }
      }
    }
  } finally {
    reader.releaseLock();
  }

  return patch;
}
