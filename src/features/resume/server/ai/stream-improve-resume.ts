import { streamObject } from "ai";

import type { AiSettings } from "@/features/resume/ai/ai-settings";
import { resumeAiPatchSchema } from "@/features/resume/ai/resume-ai-patch";
import {
  isResumeAiSectionKey,
  type ResumeAiSectionKey,
} from "@/features/resume/ai/resume-ai-sections";
import type { ResumeAiStreamEvent } from "@/features/resume/ai/resume-ai-stream";
import { createLanguageModel } from "@/features/resume/server/ai/create-language-model";
import {
  buildResumeAiPrompt,
  buildResumeAiSystemPrompt,
} from "@/features/resume/server/ai/improve-resume-prompt";
import type { ResumeDocument } from "@/features/resume/types/resume-document";

type StreamResumeAiInput = {
  jobContext: string;
  resume: ResumeDocument;
  settings: AiSettings;
};

type PartialPatch = Record<string, unknown>;

const textEncoder = new TextEncoder();

function encodeEvent(event: ResumeAiStreamEvent) {
  return textEncoder.encode(`${JSON.stringify(event)}\n`);
}

function findActiveSection(
  partialPatch: PartialPatch,
  previousPatch: PartialPatch,
) {
  let activeSection: ResumeAiSectionKey | null = null;

  for (const key of Object.keys(partialPatch)) {
    if (!isResumeAiSectionKey(key)) {
      continue;
    }

    if (JSON.stringify(partialPatch[key]) !== JSON.stringify(previousPatch[key])) {
      activeSection = key;
    }
  }

  return activeSection;
}

export function createResumeAiStream(input: StreamResumeAiInput) {
  const result = streamObject({
    model: createLanguageModel(input.settings),
    prompt: buildResumeAiPrompt({
      jobContext: input.jobContext,
      resume: input.resume,
    }),
    schema: resumeAiPatchSchema,
    system: buildResumeAiSystemPrompt(input.resume),
  });

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      let previousPatch: PartialPatch = {};
      let activeSection: ResumeAiSectionKey | null = null;

      try {
        for await (const partial of result.partialObjectStream) {
          const partialPatch = partial as PartialPatch;
          const nextSection = findActiveSection(partialPatch, previousPatch);
          previousPatch = partialPatch;

          if (nextSection && nextSection !== activeSection) {
            activeSection = nextSection;
            controller.enqueue(
              encodeEvent({ section: nextSection, type: "progress" }),
            );
          }
        }

        controller.enqueue(
          encodeEvent({ patch: await result.object, type: "done" }),
        );
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Falha ao gerar as sugestoes.";
        controller.enqueue(encodeEvent({ message, type: "error" }));
      } finally {
        controller.close();
      }
    },
  });
}
