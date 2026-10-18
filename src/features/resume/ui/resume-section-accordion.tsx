"use client";

import type { ReactNode } from "react";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

type Props = {
  children: ReactNode;
  isVisible: boolean;
  onVisibilityChange: (isVisible: boolean) => void;
  title: string;
};

export function ResumeSectionAccordion({
  children,
  isVisible,
  onVisibilityChange,
  title,
}: Props) {
  return (
    <AccordionItem value={title}>
      <div className="flex items-center gap-1">
        <AccordionTrigger
          className={`flex-1 py-3 text-sm font-semibold ${
            isVisible ? "" : "text-muted-foreground"
          }`}
        >
          {title}
        </AccordionTrigger>
        <Button
          aria-label={isVisible ? `Ocultar ${title}` : `Mostrar ${title}`}
          onClick={() => onVisibilityChange(!isVisible)}
          size="icon-sm"
          type="button"
          variant="ghost"
        >
          {isVisible ? <EyeIcon /> : <EyeOffIcon />}
        </Button>
      </div>
      <AccordionContent className="px-1 pb-4">{children}</AccordionContent>
    </AccordionItem>
  );
}
