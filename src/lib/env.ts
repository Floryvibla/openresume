import { z } from "zod";

const databaseSchema = z.object({
  DATABASE_URL: z.url(),
});

const linkedinSchema = z.object({
  LINKEDIN_JSESSIONID: z.string().min(1),
  LINKEDIN_LI_AT: z.string().min(1),
});

function parseEnv<T>(
  schema: z.ZodSchema<T>,
  source: Record<string, string | undefined>,
) {
  const parsedEnv = schema.safeParse(source);

  if (!parsedEnv.success) {
    throw new Error(parsedEnv.error.issues.map((issue) => issue.message).join(", "));
  }

  return parsedEnv.data;
}

export function readDatabaseEnv() {
  return parseEnv(databaseSchema, {
    DATABASE_URL: process.env.DATABASE_URL,
  });
}

export function hasDatabaseEnv() {
  return Boolean(process.env.DATABASE_URL?.trim());
}

export function readLinkedinEnv() {
  return parseEnv(linkedinSchema, {
    LINKEDIN_JSESSIONID: process.env.LINKEDIN_JSESSIONID,
    LINKEDIN_LI_AT: process.env.LINKEDIN_LI_AT,
  });
}
