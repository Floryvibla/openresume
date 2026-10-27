"use client";

import { useBoolean } from "usehooks-ts";

import type { ResumeDocument } from "@/features/resume/types/resume-document";
import { apiClient } from "@/lib/axios";

export function useResumePdfDownload(resume: ResumeDocument) {
  const {
    value: isDownloading,
    setTrue: startDownloading,
    setFalse: stopDownloading,
  } = useBoolean(false);

  async function downloadPdf() {
    startDownloading();

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
      stopDownloading();
    }
  }

  return { downloadPdf, isDownloading };
}
