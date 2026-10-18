import { randomUUID } from "node:crypto";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const viewerCookieName = "openresume-viewer-id";

export async function getViewerId() {
  const cookieStore = await cookies();
  return cookieStore.get(viewerCookieName)?.value ?? null;
}

export async function getOrCreateViewerId() {
  const existingViewerId = await getViewerId();
  return existingViewerId ?? randomUUID();
}

export function attachViewerCookie(response: NextResponse, viewerId: string) {
  response.cookies.set(viewerCookieName, viewerId, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    sameSite: "lax",
  });

  return response;
}
