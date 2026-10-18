"use client";

import { useMemo, useState } from "react";

import { useCopyToClipboard } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { apiClient } from "@/lib/axios";

type Props = {
  resumeId: string;
  resumeSlug: string;
};

export function ShareResumeDialog({ resumeId, resumeSlug }: Props) {
  const [isPending, setIsPending] = useState(false);
  const [, copy] = useCopyToClipboard();
  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") {
      return `/resume/${resumeSlug}`;
    }

    return `${window.location.origin}/resume/${resumeSlug}`;
  }, [resumeSlug]);

  async function handlePublish() {
    setIsPending(true);

    try {
      await apiClient.post(`/api/resumes/${resumeId}/share`, { isPublic: true });
      await copy(shareUrl);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Compartilhar</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Link compartilhavel</DialogTitle>
          <DialogDescription>
            Publica o curriculo e copia o link pronto para enviar.
          </DialogDescription>
        </DialogHeader>
        <p className="rounded-xl border bg-muted px-3 py-2 text-sm text-muted-foreground">
          {shareUrl}
        </p>
        <DialogFooter>
          <Button disabled={isPending} onClick={handlePublish} type="button">
            {isPending ? <Spinner data-icon="inline-start" /> : null}
            Publicar e copiar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
