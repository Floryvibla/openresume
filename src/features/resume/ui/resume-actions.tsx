"use client";

import { DownloadIcon, RefreshCwIcon, SquarePenIcon } from "lucide-react";
import { useBoolean } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { type ResumeDocument } from "@/features/resume/types/resume-document";
import { apiClient } from "@/lib/axios";

type Props = {
  isRefreshing?: boolean;
  onEditClick: () => void;
  onRefreshClick: () => void;
  resume: ResumeDocument;
};

export function ResumeActions({
  isRefreshing = false,
  onEditClick,
  onRefreshClick,
  resume,
}: Props) {
  const {
    value: isSaving,
    setTrue: startSaving,
    setFalse: stopSaving,
  } = useBoolean(false);
  const isBusy = isSaving || isRefreshing;

  async function handleDownload() {
    startSaving();

    try {
      const response = await apiClient.post(
        "/api/resumes/pdf",
        {
          documentJson: resume,
          title: resume.basics.fullName,
        },
        {
          responseType: "blob",
        },
      );
      const downloadUrl = URL.createObjectURL(response.data as Blob);
      const anchorElement = document.createElement("a");
      anchorElement.href = downloadUrl;
      anchorElement.download = `${resume.basics.fullName || "resume"}.pdf`;
      anchorElement.click();
      URL.revokeObjectURL(downloadUrl);
    } finally {
      stopSaving();
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button disabled={isSaving} onClick={handleDownload} type="button">
        {isSaving ? (
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
    </div>
  );
}
