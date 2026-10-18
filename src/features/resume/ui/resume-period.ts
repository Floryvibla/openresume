const CURRENT_PERIOD_LABEL = "Atual";
const EMPTY_PERIOD_LABEL = "Periodo nao informado";
const PERIOD_SEPARATOR = " - ";

export type ResumePeriodParts = {
  end: string;
  isCurrent: boolean;
  start: string;
};

export function parseResumePeriod(period: string): ResumePeriodParts {
  if (!period || period === EMPTY_PERIOD_LABEL) {
    return { end: "", isCurrent: false, start: "" };
  }

  const [rawStart, rawEnd] = period.split(PERIOD_SEPARATOR);
  const normalizedEnd = (rawEnd ?? "").trim();

  return {
    end: normalizedEnd === CURRENT_PERIOD_LABEL ? "" : normalizedEnd,
    isCurrent: normalizedEnd === CURRENT_PERIOD_LABEL,
    start: (rawStart ?? "").trim(),
  };
}

export function composeResumePeriod(parts: ResumePeriodParts): string {
  const start = parts.start.trim();
  const end = parts.end.trim();

  if (!start && !end && !parts.isCurrent) {
    return "";
  }

  return [start, parts.isCurrent ? CURRENT_PERIOD_LABEL : end]
    .filter(Boolean)
    .join(PERIOD_SEPARATOR);
}
