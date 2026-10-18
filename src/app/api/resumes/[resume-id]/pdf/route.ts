import { NextResponse } from "next/server";

import { buildResumePdfStream } from "@/features/resume/server/export-resume-pdf";
import { getResumeById } from "@/features/resume/server/resume-repository";
import { getViewerId } from "@/features/viewer/server/viewer-session";

type RouteContext = {
  params: Promise<{ "resume-id": string }>;
};

export async function GET(_: Request, { params }: RouteContext) {
  const viewerId = await getViewerId();

  if (!viewerId) {
    return NextResponse.json({ message: "Viewer nao encontrado." }, { status: 401 });
  }

  const { "resume-id": resumeId } = await params;
  const resume = await getResumeById(resumeId, viewerId);

  if (!resume) {
    return NextResponse.json({ message: "Curriculo nao encontrado." }, { status: 404 });
  }

  const stream = await buildResumePdfStream(resume.documentJson);

  return new NextResponse(stream as unknown as ReadableStream, {
    headers: {
      "Content-Disposition": `attachment; filename="${resume.resumeSlug}.pdf"`,
      "Content-Type": "application/pdf",
    },
  });
}
