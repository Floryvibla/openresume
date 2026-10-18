import { NextResponse } from "next/server";

import { buildResumePdfStream } from "@/features/resume/server/export-resume-pdf";
import { exportResumePdfSchema } from "@/features/resume/server/resume-input";

export async function POST(request: Request) {
  const payload = exportResumePdfSchema.parse(await request.json());
  const stream = await buildResumePdfStream(payload.documentJson);
  const fileName = payload.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return new NextResponse(stream as unknown as ReadableStream, {
    headers: {
      "Content-Disposition": `attachment; filename="${fileName || "resume"}.pdf"`,
      "Content-Type": "application/pdf",
    },
  });
}
