import { Client } from "@florydev/linkedin-api-voyager";

import { readLinkedinEnv } from "@/lib/env";

let isInitialized = false;

export function initializeLinkedinClient() {
  if (isInitialized) {
    return;
  }

  const { LINKEDIN_JSESSIONID, LINKEDIN_LI_AT } = readLinkedinEnv();

  Client({
    JSESSIONID: LINKEDIN_JSESSIONID,
    li_at: LINKEDIN_LI_AT,
  });

  isInitialized = true;
}
