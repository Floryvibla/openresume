import { DashboardWorkspace } from "@/features/resume/ui/dashboard-workspace";

type DashboardPageProps = {
  searchParams: Promise<{ resumeId?: string }>;
};

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const { resumeId } = await searchParams;

  return (
    <main className="page-shell">
      <section className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Workspace</h1>
        <p className="text-sm leading-7 text-muted-foreground">
          Seus curriculos salvos neste navegador. Use o editor, ajuste o tema e publique quando quiser.
        </p>
      </section>
      <DashboardWorkspace initialResumeId={resumeId} />
    </main>
  );
}
