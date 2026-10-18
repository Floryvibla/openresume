import { Pool, type QueryResultRow } from "pg";

import { readDatabaseEnv } from "@/lib/env";

declare global {
  var __openResumePool__: Pool | undefined;
}

function createPool() {
  const { DATABASE_URL } = readDatabaseEnv();
  return new Pool({
    connectionString: DATABASE_URL,
    max: 5,
  });
}

export function getDatabasePool() {
  if (!global.__openResumePool__) {
    global.__openResumePool__ = createPool();
  }

  return global.__openResumePool__;
}

export async function runQuery<Row extends QueryResultRow>(
  queryText: string,
  values: Array<unknown> = [],
) {
  return getDatabasePool().query<Row>(queryText, values);
}
