import {
  createFileResume,
  getFileResumeById,
  getFileResumeBySlug,
  listFileResumesByOwner,
  setFileResumePublicState,
  updateFileResume,
} from "@/features/resume/server/resume-file-store";
import {
  resumeDocumentSchema,
  type ResumeDocument,
  type ResumeThemeKey,
} from "@/features/resume/types/resume-document";
import type { StoredResume } from "@/features/resume/types/stored-resume";
import { hasDatabaseEnv } from "@/lib/env";
import { runQuery } from "@/lib/db";

type ResumeRow = {
  id: string;
  owner_id: string;
  title: string;
  resume_slug: string;
  document_json: ResumeDocument;
  theme_key: ResumeThemeKey;
  is_public: boolean;
  created_at: string;
  updated_at: string;
};

function mapRow(row: ResumeRow): StoredResume {
  return {
    id: row.id,
    ownerId: row.owner_id,
    title: row.title,
    resumeSlug: row.resume_slug,
    documentJson: resumeDocumentSchema.parse(row.document_json),
    themeKey: row.theme_key,
    isPublic: row.is_public,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function listResumesByOwner(ownerId: string) {
  if (!hasDatabaseEnv()) {
    return listFileResumesByOwner(ownerId);
  }

  const result = await runQuery<ResumeRow>(
    `select * from resumes where owner_id = $1 order by updated_at desc`,
    [ownerId],
  );

  return result.rows.map(mapRow);
}

export async function getResumeById(id: string, ownerId: string) {
  if (!hasDatabaseEnv()) {
    return getFileResumeById(id, ownerId);
  }

  const result = await runQuery<ResumeRow>(
    `select * from resumes where id = $1 and owner_id = $2 limit 1`,
    [id, ownerId],
  );

  return result.rows[0] ? mapRow(result.rows[0]) : null;
}

export async function getResumeBySlug(slug: string) {
  if (!hasDatabaseEnv()) {
    return getFileResumeBySlug(slug);
  }

  const result = await runQuery<ResumeRow>(
    `select * from resumes where resume_slug = $1 and is_public = true limit 1`,
    [slug],
  );

  return result.rows[0] ? mapRow(result.rows[0]) : null;
}

export async function createResume(input: {
  ownerId: string;
  title: string;
  resumeSlug: string;
  documentJson: ResumeDocument;
  themeKey: ResumeThemeKey;
}) {
  if (!hasDatabaseEnv()) {
    return createFileResume(input);
  }

  const result = await runQuery<ResumeRow>(
    `insert into resumes (
      owner_id, title, resume_slug, document_json, theme_key
    ) values ($1, $2, $3, $4, $5) returning *`,
    [
      input.ownerId,
      input.title,
      input.resumeSlug,
      JSON.stringify(input.documentJson),
      input.themeKey,
    ],
  );

  return mapRow(result.rows[0]);
}

export async function updateResume(input: {
  id: string;
  ownerId: string;
  title: string;
  documentJson: ResumeDocument;
  themeKey: ResumeThemeKey;
}) {
  if (!hasDatabaseEnv()) {
    return updateFileResume(input);
  }

  const result = await runQuery<ResumeRow>(
    `update resumes
      set title = $3, document_json = $4, theme_key = $5, updated_at = now()
      where id = $1 and owner_id = $2
      returning *`,
    [input.id, input.ownerId, input.title, JSON.stringify(input.documentJson), input.themeKey],
  );

  return result.rows[0] ? mapRow(result.rows[0]) : null;
}

export async function setResumePublicState(input: {
  id: string;
  ownerId: string;
  isPublic: boolean;
}) {
  if (!hasDatabaseEnv()) {
    return setFileResumePublicState(input);
  }

  const result = await runQuery<ResumeRow>(
    `update resumes
      set is_public = $3, updated_at = now()
      where id = $1 and owner_id = $2
      returning *`,
    [input.id, input.ownerId, input.isPublic],
  );

  return result.rows[0] ? mapRow(result.rows[0]) : null;
}
