import { Skeleton } from "@/components/ui/skeleton";

export default function ResumeLoading() {
  return (
    <main className="page-shell">
      <Skeleton className="h-12 w-56 rounded-2xl" />
      <Skeleton className="h-130 rounded-[32px]" />
    </main>
  );
}
