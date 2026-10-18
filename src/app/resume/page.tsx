import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { loadResumeByIdentifier } from "@/features/resume/server/load-resume";
import { ResumePlayground } from "@/features/resume/ui/resume-playground";

type ResumePageProps = {
  searchParams: Promise<{ identifier?: string }>;
};

export default async function ResumePage({ searchParams }: ResumePageProps) {
  const { identifier } = await searchParams;

  if (!identifier) {
    return (
      <main className="page-shell">
        <Empty className="border">
          <EmptyHeader>
            <EmptyTitle>Nenhum perfil informado</EmptyTitle>
            <EmptyDescription>
              Volte para a landing, cole a URL do LinkedIn e gere seu curriculo.
            </EmptyDescription>
          </EmptyHeader>
          <Button nativeButton={false} render={<Link href="/" />}>
            Voltar para a landing
          </Button>
        </Empty>
      </main>
    );
  }

  const resume = await loadResumeByIdentifier(identifier);

  return (
    <main className="page-shell">
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">Preview do curriculo</h1>
        <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
          Revise o documento gerado, edite o conteudo e depois baixe o PDF ou salve no workspace.
        </p>
      </section>
      <ResumePlayground initialTitle={resume.basics.fullName} resume={resume} />
    </main>
  );
}
