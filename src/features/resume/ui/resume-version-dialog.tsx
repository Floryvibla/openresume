"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ResumeVersion } from "@/features/resume/ai/resume-version";
import type { ResumeDocument } from "@/features/resume/types/resume-document";

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onRestore: (resume: ResumeDocument) => void;
  versions: ResumeVersion[];
};

export function ResumeVersionDialog({
  isOpen,
  onOpenChange,
  onRestore,
  versions,
}: Props) {
  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Historico de versoes</DialogTitle>
          <DialogDescription>
            Veja como o curriculo ficou depois de cada sugestao da IA e
            restaure uma versao anterior.
          </DialogDescription>
        </DialogHeader>
        {versions.length ? (
          <ul className="flex max-h-[60vh] flex-col gap-2 overflow-y-auto">
            {versions.map((version) => (
              <li
                className="flex items-center justify-between gap-3 rounded-lg border p-3"
                key={version.id}
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{version.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(version.createdAt).toLocaleString("pt-BR")}
                  </span>
                </div>
                <Button
                  onClick={() => onRestore(version.resume)}
                  size="sm"
                  type="button"
                  variant="outline"
                >
                  Restaurar
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">
            Nenhuma versao salva ainda. Aplique uma sugestao da IA para criar a
            primeira.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
