"use client";

import { SparklesIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  isGenerating: boolean;
  onClick: () => void;
};

export function ResumeAiFloatingButton({ isGenerating, onClick }: Props) {
  return (
    <Button
      aria-label="Melhorar curriculo com IA"
      className="fixed right-6 bottom-[calc(1.5rem+env(safe-area-inset-bottom))] z-40 rounded-full shadow-lg shadow-black/15"
      disabled={isGenerating}
      onClick={onClick}
      size="lg"
      type="button"
    >
      {isGenerating ? (
        <Spinner data-icon="inline-start" />
      ) : (
        <SparklesIcon data-icon="inline-start" />
      )}
      {isGenerating ? "Melhorando..." : "Melhorar com IA"}
    </Button>
  );
}
