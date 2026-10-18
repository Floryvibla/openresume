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

function getExperienceCost(text: string) {
  return 15 + Math.ceil(text.length / 150) * 4;
}

function getListChunkCount(remainingSpace: number, itemCosts: number[]) {
  let consumedSpace = 10;
  let chunkCount = 0;

  for (const itemCost of itemCosts) {
    if (consumedSpace + itemCost > remainingSpace && chunkCount > 0) {
      break;
    }

    consumedSpace += itemCost;
    chunkCount += 1;
  }

  return Math.max(chunkCount, 1);
}

export function buildResumePages(resume: ResumeDocument) {
  const copy = getResumeCopy(resume.language);
  const pages: ResumePage[] = [{ blocks: [], pageNumber: 1 }];
  let usedCapacity = 24;

  function pushBlock(block: ResumePageBlock, blockCost: number) {
    if (usedCapacity + blockCost > pageCapacity && pages.at(-1)?.blocks.length) {
      pages.push({ blocks: [], pageNumber: pages.length + 1 });
      usedCapacity = 0;
    }

    pages.at(-1)?.blocks.push(block);
    usedCapacity += blockCost;
  }

  if (resume.visibleSections.summary && resume.summary.trim()) {
    const summaryCost = 16 + Math.ceil(resume.summary.length / 240) * 7;
    pushBlock({ key: "summary", text: resume.summary, title: copy.summary }, summaryCost);
  }

  if (resume.visibleSections.experiences && resume.experiences.length) {
    const pendingItems = [...resume.experiences];

    while (pendingItems.length) {
      const itemCosts = pendingItems.map((item) =>
        getExperienceCost([item.title, item.companyName, item.description].filter(Boolean).join(" ")),
      );
      const chunkCount = getListChunkCount(pageCapacity - usedCapacity, itemCosts);
      const chunk = pendingItems.splice(0, chunkCount);
      const blockCost = 12 + itemCosts.slice(0, chunkCount).reduce((sum, cost) => sum + cost, 0);
      pushBlock({
        items: chunk.map((item) => item.id),
        key: "experiences",
        title: copy.experience,
      }, blockCost);
    }
  }

  if (resume.visibleSections.education && resume.education.length) {
    const cost = 14 + resume.education.length * 12;
    pushBlock({
      items: resume.education.map((item) => item.id),
      key: "education",
      title: copy.education,
    }, cost);
  }

  if (resume.visibleSections.skills && resume.skills.length) {
    const cost = 14 + Math.ceil(resume.skills.length / 6) * 10;
    pushBlock({ items: resume.skills, key: "skills", title: copy.skills }, cost);
  }

  if (resume.visibleSections.certifications && resume.certifications.length) {
    const cost = 14 + resume.certifications.length * 10;
    pushBlock({
      items: resume.certifications.map((item) => item.id),
      key: "certifications",
      title: copy.certifications,
    }, cost);
  }

  if (resume.visibleSections.languages && resume.languages.length) {
    const cost = 14 + resume.languages.length * 8;
    pushBlock({
      items: resume.languages.map((item) => item.id),
      key: "languages",
      title: copy.languages,
    }, cost);
  }

  return pages;
}
