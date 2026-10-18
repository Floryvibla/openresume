export type LinkedinPeriodDatePart = {
  year?: number;
  month?: number;
  day?: number;
} | null;

export type LinkedinPeriod = {
  start?: LinkedinPeriodDatePart;
  end?: LinkedinPeriodDatePart;
} | null;

export type LinkedinExperiencePosition = {
  title?: string | null;
  companyName?: string | null;
  locationName?: string | null;
  description?: string | null;
  timePeriod?: LinkedinPeriod;
};

export type LinkedinExperienceGroup = {
  companyName?: string | null;
  timePeriod?: LinkedinPeriod;
  positions?: LinkedinExperiencePosition[] | null;
};
