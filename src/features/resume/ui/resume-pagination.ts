import type { ResumeDocument } from "@/features/resume/types/resume-document";
import { getResumeCopy } from "@/features/resume/ui/resume-copy";

type ResumePageBlock = {
  items?: string[];
  key:
    | "summary"
    | "experiences"
    | "education"
    | "skills"
    | "certifications"
    | "languages";
  text?: string;
  title: string;
};

export type ResumePage = {
  blocks: ResumePageBlock[];
  pageNumber: number;
};

const pageCapacity = 100;
const headerCost = 18;
const sectionCost = 8;

function getTextCost(text: string, charsPerLine: number) {
  return Math.max(1, Math.ceil(text.trim().length / charsPerLine));
}

function getExperienceCost(text: string) {
  return 7 + getTextCost(text, 80);
}

function getListChunkCount(remainingSpace: number, itemCosts: number[]) {
  let consumedSpace = sectionCost;
  let chunkCount = 0;

  for (const itemCost of itemCosts) {
    if (consumedSpace + itemCost > remainingSpace) {
      break;
    }

    consumedSpace += itemCost;
    chunkCount += 1;
  }

  return chunkCount;
}

export function buildResumePages(resume: ResumeDocument) {
  const copy = getResumeCopy(resume.language);
  const pages: ResumePage[] = [{ blocks: [], pageNumber: 1 }];
  let usedCapacity = headerCost;

  function startNewPage() {
    pages.push({ blocks: [], pageNumber: pages.length + 1 });
    usedCapacity = 0;
  }

  function pushBlock(block: ResumePageBlock, blockCost: number) {
    if (usedCapacity + blockCost > pageCapacity && pages.at(-1)?.blocks.length) {
      startNewPage();
    }

    pages.at(-1)?.blocks.push(block);
    usedCapacity += blockCost;
  }

  function pushListBlocks<TItem>({
    items,
    key,
    title,
    getItemCost,
    getItemKey,
  }: {
    items: TItem[];
    key: ResumePageBlock["key"];
    title: string;
    getItemCost: (item: TItem) => number;
    getItemKey: (item: TItem) => string;
  }) {
    const pendingItems = [...items];

    while (pendingItems.length) {
      const itemCosts = pendingItems.map(getItemCost);
      const chunkCount = getListChunkCount(pageCapacity - usedCapacity, itemCosts);

      if (!chunkCount && pages.at(-1)?.blocks.length) {
        startNewPage();
        continue;
      }

      const safeChunkCount = Math.max(chunkCount, 1);
      const chunk = pendingItems.splice(0, safeChunkCount);
      const blockCost = sectionCost + itemCosts.slice(0, safeChunkCount).reduce((sum, cost) => sum + cost, 0);
      pushBlock({ items: chunk.map(getItemKey), key, title }, blockCost);
    }
  }

  if (resume.visibleSections.summary && resume.summary.trim()) {
    const summaryCost = 10 + getTextCost(resume.summary, 72);
    pushBlock({ key: "summary", text: resume.summary, title: copy.summary }, summaryCost);
  }

  if (resume.visibleSections.experiences && resume.experiences.length) {
    pushListBlocks({
      getItemCost: (item) =>
        getExperienceCost([item.title, item.companyName, item.location, item.description].filter(Boolean).join(" ")),
      getItemKey: (item) => item.id,
      items: resume.experiences,
      key: "experiences",
      title: copy.experience,
    });
  }

  if (resume.visibleSections.education && resume.education.length) {
    pushListBlocks({
      getItemCost: (item) => 6 + getTextCost([item.degreeName, item.schoolName, item.fieldOfStudy].filter(Boolean).join(" "), 80),
      getItemKey: (item) => item.id,
      items: resume.education,
      key: "education",
      title: copy.education,
    });
  }

  if (resume.visibleSections.skills && resume.skills.length) {
    pushListBlocks({
      getItemCost: () => 1,
      getItemKey: (item) => item,
      items: resume.skills,
      key: "skills",
      title: copy.skills,
    });
  }

  if (resume.visibleSections.certifications && resume.certifications.length) {
    pushListBlocks({
      getItemCost: (item) => 5 + getTextCost([item.name, item.issuer].filter(Boolean).join(" "), 85),
      getItemKey: (item) => item.id,
      items: resume.certifications,
      key: "certifications",
      title: copy.certifications,
    });
  }

  if (resume.visibleSections.languages && resume.languages.length) {
    pushListBlocks({
      getItemCost: (item) => 5 + getTextCost([item.name, item.proficiency].filter(Boolean).join(" "), 85),
      getItemKey: (item) => item.id,
      items: resume.languages,
      key: "languages",
      title: copy.languages,
    });
  }

  return pages;
}
