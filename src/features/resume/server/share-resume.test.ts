import { describe, expect, it } from "vitest";

import { createResumeSlug } from "@/features/resume/server/share-resume";

describe("createResumeSlug", () => {
  it("creates a readable slug with a unique suffix", () => {
    const slug = createResumeSlug("Lucas Bennett CV", "lucas-bennett");

    expect(slug).toMatch(/^lucas-bennett-cv-lucas-bennett-[a-f0-9]{8}$/);
  });
});
