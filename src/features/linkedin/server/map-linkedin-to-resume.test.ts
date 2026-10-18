import { describe, expect, it } from "vitest";

import { mapLinkedinToResume } from "@/features/linkedin/server/map-linkedin-to-resume";

describe("mapLinkedinToResume", () => {
  it("maps imported linkedin data into the internal resume schema", () => {
    const resume = mapLinkedinToResume({
      about: "Senior engineer building resume tools.",
      certifications: [
        {
          authority: "Open Resume",
          companyUrn: null,
          displaySource: null,
          licenseNumber: null,
          name: "ATS Specialist",
          timePeriod: { end: null, start: { day: 1, month: 3, year: 2024 } },
          url: null,
        },
      ],
      education: [
        {
          activities: null,
          degreeName: "BSc Computer Science",
          description: null,
          fieldOfStudy: "Software Engineering",
          grade: null,
          schoolName: "USP",
          schoolUrn: null,
          timePeriod: {
            end: { day: 1, month: 12, year: 2020 },
            start: { day: 1, month: 1, year: 2016 },
          },
        },
      ],
      experienceGroups: [
        {
          companyName: "Open Resume",
          positions: [
            {
              companyName: null,
              description: "Built ATS-first resume flows.",
              locationName: "Remote",
              timePeriod: { end: null, start: { day: 1, month: 6, year: 2022 } },
              title: "Senior Engineer",
            },
          ],
          timePeriod: { end: null, start: { day: 1, month: 6, year: 2022 } },
        },
      ],
      profile: {
        about: "",
        backgroundPicture: null,
        birthDate: { day: 1, month: 1 },
        firstName: "Lucas",
        fullName: "Lucas Bennett",
        headline: "Senior Engineer",
        id_urn: "urn:li:person:1",
        lastName: "Bennett",
        profilePicture: null,
        publicIdentifier: "lucas-bennett",
      },
      publicIdentifier: "lucas-bennett",
      skills: [{ endorsementCount: null, entityUrn: "urn:skill:typescript", name: "TypeScript" }],
    });

    expect(resume.basics.fullName).toBe("Lucas Bennett");
    expect(resume.skills).toEqual(["TypeScript"]);
    expect(resume.education[0]?.period).toBe("01/2016 - 12/2020");
    expect(resume.certifications[0]?.issuer).toBe("Open Resume");
    expect(resume.experiences[0]?.title).toBe("Senior Engineer");
    expect(resume.experiences[0]?.companyName).toBe("Open Resume");
    expect(resume.experiences[0]?.location).toBe("Remote");
  });
});
