import { renderToStream } from "@react-pdf/renderer";

import { ResumePdfDocument } from "@/features/resume/server/resume-pdf-document";
import type { ResumeDocument } from "@/features/resume/types/resume-document";

export async function buildResumePdfStream(resume: ResumeDocument) {
  return renderToStream(<ResumePdfDocument resume={resume} />);
}
