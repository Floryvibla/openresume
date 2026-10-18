import { NextResponse } from "next/server";
import { z } from "zod";

import { setResumePublicState } from "@/features/resume/server/resume-repository";
import { getViewerId } from "@/features/viewer/server/viewer-session";

const shareSchema = z.object({
  isPublic: z.boolean(),
});

type RouteContext = {
  params: Promise<{ "resume-id": string }>;
};

export async function POST(request: Request, { params }: RouteContext) {
  const viewerId = await getViewerId();

  if (!viewerId) {
    return NextResponse.json({ message: "Viewer nao encontrado." }, { status: 401 });
  }

  const payload = shareSchema.parse(await request.json());
  const { "resume-id": resumeId } = await params;
  const resume = await setResumePublicState({
    id: resumeId,
    isPublic: payload.isPublic,
    ownerId: viewerId,
  });

  if (!resume) {
    return NextResponse.json({ message: "Curriculo nao encontrado." }, { status: 404 });
  }

  return NextResponse.json(resume);
}
