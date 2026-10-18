import { Separator } from "@/components/ui/separator";

type Props = {
  children: React.ReactNode;
  title: string;
};

export function ResumeSection({ children, title }: Props) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <h2 className="resume-accent text-[0.9rem] font-black uppercase tracking-[0.01em]">
          {title}
        </h2>
        <Separator className="bg-black/35" />
      </div>
      {children}
    </section>
  );
}
