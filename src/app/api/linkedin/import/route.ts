import { NextResponse } from "next/server";
import { z } from "zod";

import {
  LinkedinImportInputError,
  LinkedinImportRateLimitError,
  LinkedinImportSessionError,
} from "@/features/linkedin/server/linkedin-errors";
import { importLinkedinProfile } from "@/features/linkedin/server/import-profile";
import { mapLinkedinToResume } from "@/features/linkedin/server/map-linkedin-to-resume";

const querySchema = z.object({
  identifier: z.string().min(1),
});

export async function GET(request: Request) {
  try {
    const { identifier } = querySchema.parse(
      Object.fromEntries(new URL(request.url).searchParams),
    );

    const importedProfile = await importLinkedinProfile(identifier);
    const resume = mapLinkedinToResume(importedProfile);

    return NextResponse.json({ profile: importedProfile, resume });
  } catch (error) {
    if (error instanceof LinkedinImportInputError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    if (error instanceof LinkedinImportSessionError) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }

    if (error instanceof LinkedinImportRateLimitError) {
      return NextResponse.json({ message: error.message }, { status: 429 });
    }

    return NextResponse.json(
      { message: "Nao foi possivel importar o perfil agora." },
      { status: 500 },
    );
  }
}
