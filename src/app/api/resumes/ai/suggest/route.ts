import { NextResponse } from "next/server";
import { z } from "zod";

import { aiSettingsSchema } from "@/features/resume/ai/ai-settings";
import { fetchJobDescription } from "@/features/resume/server/ai/fetch-job-description";
import { createResumeAiStream } from "@/features/resume/server/ai/stream-improve-resume";
import { resumeDocumentSchema } from "@/features/resume/types/resume-document";

const requestSchema = z.object({
  jobDescription: z.string().default(""),
  jobUrl: z.string().default(""),
  resume: resumeDocumentSchema,
  settings: aiSettingsSchema,
});

export async function POST(request: Request) {
  try {
    const parsedBody = requestSchema.safeParse(await request.json());

    if (!parsedBody.success) {
      return NextResponse.json(
        { message: "Dados invalidos." },
        { status: 400 },
      );
    }

    const { jobDescription, jobUrl, resume, settings } = parsedBody.data;

    if (!settings.apiKey) {
      return NextResponse.json(
        { message: "Informe a chave da API do provedor escolhido." },
        { status: 400 },
      );
    }

    let linkContext = "";

    try {
      linkContext = jobUrl ? await fetchJobDescription(jobUrl) : "";
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Falha ao ler o link da vaga.";

      return NextResponse.json({ message }, { status: 502 });
    }

    const jobContext = [jobDescription, linkContext]
      .filter(Boolean)
      .join("\n\n");
    const stream = createResumeAiStream({ jobContext, resume, settings });

    return new Response(stream, {
      headers: {
        "cache-control": "no-store",
        "content-type": "application/x-ndjson",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Falha ao gerar as sugestoes.";

    return NextResponse.json({ message }, { status: 500 });
  }
}
