const linkedinProfilePrefix = "linkedin.com/in/";

export function formatLinkedinUrl(value: string) {
  const trimmedValue = value.trim().replace(/\/+$/, "");

  if (!trimmedValue) {
    return "";
  }

  if (trimmedValue.includes("linkedin.com/")) {
    return trimmedValue.replace(/^https?:\/\//, "").replace(/^www\./, "");
  }

  return `${linkedinProfilePrefix}${trimmedValue}`;
}
