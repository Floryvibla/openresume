import { NextResponse } from "next/server";

import {
  getResumeById,
  updateResume,
} from "@/features/resume/server/resume-repository";
import { updateResumeSchema } from "@/features/resume/server/resume-input";
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

  return NextResponse.json(resume);
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const viewerId = await getViewerId();

  if (!viewerId) {
    return NextResponse.json({ message: "Viewer nao encontrado." }, { status: 401 });
  }

  const payload = updateResumeSchema.parse(await request.json());
  const { "resume-id": resumeId } = await params;
  const resume = await updateResume({
    documentJson: payload.documentJson,
    id: resumeId,
    ownerId: viewerId,
    themeKey: payload.themeKey,
    title: payload.title,
  });

  if (!resume) {
    return NextResponse.json({ message: "Curriculo nao encontrado." }, { status: 404 });
  }

  return NextResponse.json(resume);
}
