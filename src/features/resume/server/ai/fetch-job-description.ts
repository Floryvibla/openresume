const blockedHostnamePattern = /(^localhost$|\.localhost$|\.local$|\.internal$)/i;
const blockedIpv4Pattern =
  /^(0\.|10\.|127\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/;
const maxJobDescriptionLength = 8000;
const requestTimeoutInMilliseconds = 15000;

function isBlockedHostname(hostname: string) {
  return (
    blockedHostnamePattern.test(hostname) || blockedIpv4Pattern.test(hostname)
  );
}

function stripHtml(html: string) {
  return html
    .replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#39;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

export async function fetchJobDescription(url: string) {
  const parsedUrl = new URL(url);

  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    throw new Error("Informe um link http ou https.");
  }

  if (isBlockedHostname(parsedUrl.hostname)) {
    throw new Error("Esse endereco nao e permitido.");
  }

  const response = await fetch(parsedUrl, {
    headers: { "user-agent": "Mozilla/5.0 (compatible; OpenResumeBot/1.0)" },
    signal: AbortSignal.timeout(requestTimeoutInMilliseconds),
  });

  if (!response.ok) {
    throw new Error("Nao foi possivel abrir esse link.");
  }

  return stripHtml(await response.text()).slice(0, maxJobDescriptionLength);
}
