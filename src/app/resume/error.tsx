"use client";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

type Props = {
  error: Error;
  reset: () => void;
};

export default function ResumeError({ error, reset }: Props) {
  return (
    <main className="page-shell">
      <Empty className="border">
        <EmptyHeader>
          <EmptyTitle>Nao foi possivel gerar o curriculo</EmptyTitle>
          <EmptyDescription>{error.message}</EmptyDescription>
        </EmptyHeader>
        <Button onClick={reset} type="button">
          Tentar novamente
        </Button>
      </Empty>
    </main>
  );
}
