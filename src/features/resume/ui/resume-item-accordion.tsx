"use client";

import type { ReactNode } from "react";

import { PlusIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export type ResumeListItem = {
  id: string;
};

type ItemSummary = {
  primary: string;
  secondary?: string;
};

type Props<TItem extends ResumeListItem> = {
  addLabel: string;
  createItem: () => TItem;
  emptyLabel: string;
  getSummary: (item: TItem) => ItemSummary;
  items: TItem[];
  onChange: (items: TItem[]) => void;
  renderFields: (
    item: TItem,
    update: (partial: Partial<TItem>) => void,
    remove: () => void,
  ) => ReactNode;
};

export function ResumeItemAccordion<TItem extends ResumeListItem>({
  addLabel,
  createItem,
  emptyLabel,
  getSummary,
  items,
  onChange,
  renderFields,
}: Props<TItem>) {
  function updateItem(nextItem: TItem) {
    onChange(items.map((item) => (item.id === nextItem.id ? nextItem : item)));
  }

  return (
    <div className="flex flex-col gap-3">
      {items.length > 0 ? (
        <Accordion>
          {items.map((item) => {
            const summary = getSummary(item);

            return (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger>
                  <span className="flex flex-col gap-0.5">
                    <span>{summary.primary}</span>
                    {summary.secondary ? (
                      <span className="text-xs font-normal text-muted-foreground">
                        {summary.secondary}
                      </span>
                    ) : null}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  {renderFields(
                    item,
                    (partial) => updateItem({ ...item, ...partial }),
                    () =>
                      onChange(
                        items.filter((current) => current.id !== item.id),
                      ),
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      ) : (
        <p className="text-sm text-muted-foreground">{emptyLabel}</p>
      )}
      <Button
        className="w-fit"
        onClick={() => onChange([...items, createItem()])}
        size="sm"
        type="button"
        variant="outline"
      >
        <PlusIcon data-icon="inline-start" />
        {addLabel}
      </Button>
    </div>
  );
}
