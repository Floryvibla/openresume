export function splitResumeBullets(text: string | null) {
  if (!text) {
    return [];
  }

  return text
    .split("\n")
    .map((line) => line.replace(/^\s*[-•*]\s*/, "").trim())
    .filter(Boolean);
}
