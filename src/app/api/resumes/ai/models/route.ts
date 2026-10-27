import { NextResponse } from "next/server";

import { aiProviderKeys } from "@/features/resume/ai/ai-provider-catalog";
import { listAiModels } from "@/features/resume/server/ai/list-ai-models";

export async function GET(request: Request) {
  const provider = new URL(request.url).searchParams.get("provider");

  if (!provider || !aiProviderKeys.includes(provider as (typeof aiProviderKeys)[number])) {
    return NextResponse.json({ message: "Provedor invalido." }, { status: 400 });
  }

  try {
    const models = await listAiModels(provider as (typeof aiProviderKeys)[number]);

    return NextResponse.json(
      { models },
      { headers: { "cache-control": "public, max-age=3600, s-maxage=86400" } },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Falha ao carregar os modelos.";

    return NextResponse.json({ message }, { status: 502 });
  }
}
