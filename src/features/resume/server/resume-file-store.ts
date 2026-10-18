import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

import {
  resumeDocumentSchema,
  type ResumeDocument,
  type ResumeThemeKey,
} from "@/features/resume/types/resume-document";
import type { StoredResume } from "@/features/resume/types/stored-resume";

type FileStore = {
  resumes: StoredResume[];
};

const fileStorePath = path.join(process.cwd(), ".data", "resumes.json");

async function ensureFileStore() {
  await mkdir(path.dirname(fileStorePath), { recursive: true });

  try {
    await readFile(fileStorePath, "utf-8");
  } catch {
    await writeFile(fileStorePath, JSON.stringify({ resumes: [] satisfies StoredResume[] }, null, 2));
  }
}

async function readStore() {
  await ensureFileStore();
  const rawStore = await readFile(fileStorePath, "utf-8");
  return JSON.parse(rawStore) as FileStore;
}

async function writeStore(store: FileStore) {
  await writeFile(fileStorePath, JSON.stringify(store, null, 2));
}

function normalizeStoredResume(resume: StoredResume): StoredResume {
  return {
    ...resume,
    documentJson: resumeDocumentSchema.parse(resume.documentJson),
  };
}

export async function listFileResumesByOwner(ownerId: string) {
  const store = await readStore();
  return store.resumes
    .filter((resume) => resume.ownerId === ownerId)
    .map(normalizeStoredResume)
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}

export async function getFileResumeById(id: string, ownerId: string) {
  const store = await readStore();
  const resume = store.resumes.find((item) => item.id === id && item.ownerId === ownerId);
  return resume ? normalizeStoredResume(resume) : null;
}

export async function getFileResumeBySlug(slug: string) {
  const store = await readStore();
  const resume = store.resumes.find((item) => item.resumeSlug === slug && item.isPublic);
  return resume ? normalizeStoredResume(resume) : null;
}

export async function createFileResume(input: {
  documentJson: ResumeDocument;
  ownerId: string;
  resumeSlug: string;
  themeKey: ResumeThemeKey;
  title: string;
}) {
  const store = await readStore();
  const timestamp = new Date().toISOString();
  const resume: StoredResume = {
    createdAt: timestamp,
    documentJson: input.documentJson,
    id: randomUUID(),
    isPublic: false,
    ownerId: input.ownerId,
    resumeSlug: input.resumeSlug,
    themeKey: input.themeKey,
    title: input.title,
    updatedAt: timestamp,
  };

  store.resumes.unshift(resume);
  await writeStore(store);
  return resume;
}

export async function updateFileResume(input: {
  documentJson: ResumeDocument;
  id: string;
  ownerId: string;
  themeKey: ResumeThemeKey;
  title: string;
}) {
  const store = await readStore();
  const resumeIndex = store.resumes.findIndex(
    (resume) => resume.id === input.id && resume.ownerId === input.ownerId,
  );

  if (resumeIndex < 0) {
    return null;
  }

  const existingResume = store.resumes[resumeIndex];
  const nextResume: StoredResume = {
    ...existingResume,
    documentJson: input.documentJson,
    themeKey: input.themeKey,
    title: input.title,
    updatedAt: new Date().toISOString(),
  };

  store.resumes[resumeIndex] = nextResume;
  await writeStore(store);
  return nextResume;
}

export async function setFileResumePublicState(input: {
  id: string;
  isPublic: boolean;
  ownerId: string;
}) {
  const store = await readStore();
  const resumeIndex = store.resumes.findIndex(
    (resume) => resume.id === input.id && resume.ownerId === input.ownerId,
  );

  if (resumeIndex < 0) {
    return null;
  }

  const nextResume: StoredResume = {
    ...store.resumes[resumeIndex],
    isPublic: input.isPublic,
    updatedAt: new Date().toISOString(),
  };

  store.resumes[resumeIndex] = nextResume;
  await writeStore(store);
  return nextResume;
}
