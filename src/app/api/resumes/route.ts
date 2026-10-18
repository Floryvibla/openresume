import { NextResponse } from "next/server";

import { createResume } from "@/features/resume/server/resume-repository";
import { createResumeSlug } from "@/features/resume/server/share-resume";
import { createResumeSchema } from "@/features/resume/server/resume-input";
import { getOrCreateViewerId, attachViewerCookie } from "@/features/viewer/server/viewer-session";
import { getViewerId } from "@/features/viewer/server/viewer-session";

export async function GET() {
  const viewerId = await getViewerId();

  if (!viewerId) {
    return NextResponse.json([]);
  }

  const { listResumesByOwner } = await import("@/features/resume/server/resume-repository");
  const resumes = await listResumesByOwner(viewerId);
  return NextResponse.json(resumes);
}

export async function POST(request: Request) {
  const payload = createResumeSchema.parse(await request.json());
  const viewerId = await getOrCreateViewerId();
  const resume = await createResume({
    documentJson: payload.documentJson,
    ownerId: viewerId,
    resumeSlug: createResumeSlug(payload.title, payload.documentJson.basics.publicIdentifier),
    themeKey: payload.themeKey,
    title: payload.title,
  });

  const response = NextResponse.json(resume, { status: 201 });
  return attachViewerCookie(response, viewerId);
}
