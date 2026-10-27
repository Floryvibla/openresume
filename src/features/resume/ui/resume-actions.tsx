"use client";

import {
  DownloadIcon,
  HistoryIcon,
  RefreshCwIcon,
  SquarePenIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useResumePdfDownload } from "@/features/resume/hooks/use-resume-pdf-download";
import { type ResumeDocument } from "@/features/resume/types/resume-document";

type Props = {
  isRefreshing?: boolean;
  onEditClick: () => void;
  onHistoryClick: () => void;
  onRefreshClick: () => void;
  resume: ResumeDocument;
};

export function ResumeActions({
  isRefreshing = false,
  onEditClick,
  onHistoryClick,
  onRefreshClick,
  resume,
}: Props) {
  const { downloadPdf, isDownloading } = useResumePdfDownload(resume);
  const isBusy = isDownloading || isRefreshing;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button disabled={isDownloading} onClick={downloadPdf} type="button">
        {isDownloading ? (
          <Spinner data-icon="inline-start" />
        ) : (
          <DownloadIcon data-icon="inline-start" />
        )}
        Baixar PDF
      </Button>
      <Button
        disabled={isBusy}
        onClick={onEditClick}
        type="button"
        variant="outline"
      >
        <SquarePenIcon data-icon="inline-start" />
        Editar
      </Button>
      <Button
        disabled={isBusy}
        onClick={onRefreshClick}
        type="button"
        variant="outline"
      >
        {isRefreshing ? (
          <Spinner data-icon="inline-start" />
        ) : (
          <RefreshCwIcon data-icon="inline-start" />
        )}
        Atualizar com LinkedIn
      </Button>
      <Button
        disabled={isBusy}
        onClick={onHistoryClick}
        type="button"
        variant="outline"
      >
        <HistoryIcon data-icon="inline-start" />
        Historico
      </Button>
    </div>
  );
}
