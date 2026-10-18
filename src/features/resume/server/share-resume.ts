import { randomUUID } from "node:crypto";

export function createResumeSlug(title: string, publicIdentifier: string) {
  const baseSlug = `${title}-${publicIdentifier}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);

  return `${baseSlug}-${randomUUID().slice(0, 8)}`;
}
