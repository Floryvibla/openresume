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
      <ResumePlayground initialTitle={resume.basics.fullName} resume={resume} />
    </main>
  );
}
