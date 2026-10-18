"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { useResumeItem, useResumeList } from "@/features/resume/hooks/use-resume";
import { ResumePlayground } from "@/features/resume/ui/resume-playground";
import { ShareResumeDialog } from "@/features/resume/ui/share-resume-dialog";
import type { StoredResume } from "@/features/resume/types/stored-resume";

type Props = {
  initialResumeId?: string;
};

export function DashboardWorkspace({ initialResumeId }: Props) {
  const listQuery = useResumeList();
  const resumes = useMemo(() => (listQuery.data ?? []) as StoredResume[], [listQuery.data]);
  const [selectedId, setSelectedId] = useState(initialResumeId);
  const activeResumeId = selectedId ?? resumes[0]?.id;
  const resumeQuery = useResumeItem(activeResumeId);
  const activeResume = useMemo(
    () => (resumeQuery.data ?? resumes.find((item) => item.id === activeResumeId)) as StoredResume | undefined,
    [activeResumeId, resumeQuery.data, resumes],
  );

  if (listQuery.isLoading) {
    return <Skeleton className="h-130 rounded-[32px]" />;
  }

  if (!resumes.length) {
    return (
      <Empty className="border">
        <EmptyHeader>
          <EmptyTitle>Nenhum curriculo salvo ainda</EmptyTitle>
          <EmptyDescription>
            Gere um curriculo pela landing page e salve no workspace para editar depois.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  if (!activeResume) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-3">
        {resumes.map((resume) => (
          <Button
            key={resume.id}
            onClick={() => setSelectedId(resume.id)}
            size="sm"
            type="button"
            variant={resume.id === activeResumeId ? "default" : "outline"}
          >
            {resume.title}
          </Button>
        ))}
        <ShareResumeDialog resumeId={activeResume.id} resumeSlug={activeResume.resumeSlug} />
      </div>
      <ResumePlayground
        initialTitle={activeResume.title}
        key={activeResume.id}
        resume={activeResume.documentJson}
        resumeId={activeResume.id}
      />
    </div>
  );
}
