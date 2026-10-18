import { FileTextIcon } from "lucide-react";

export function LogoMark() {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border bg-card px-3 py-2">
      <div className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <FileTextIcon />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold tracking-tight">Open Resume</span>
        <span className="text-xs text-muted-foreground">LinkedIn to ATS resume</span>
      </div>
    </div>
  );
}
