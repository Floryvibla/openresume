import type { ReactNode } from "react";

import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

import { buildResumePages } from "@/features/resume/ui/resume-pagination";
import type { ResumeDocument } from "@/features/resume/types/resume-document";

const styles = StyleSheet.create({
  certification: { marginBottom: 5 },
  company: { color: "#444444", fontSize: 10, fontWeight: 700 },
  header: { borderBottom: "1 solid #7a7a7a", marginBottom: 18, paddingBottom: 14, textAlign: "center" },
  headline: { color: "#4f4f4f", fontSize: 12, fontWeight: 700, marginTop: 6 },
  item: { marginBottom: 10 },
  location: { color: "#5d5d5d", fontSize: 9, marginTop: 2 },
  meta: { color: "#666666", fontSize: 9, marginTop: 6 },
  name: { fontSize: 24, fontWeight: 900, letterSpacing: 1.1 },
  page: { backgroundColor: "#ffffff", color: "#111111", fontSize: 10, padding: 34 },
  pageNumber: { color: "#7a7a7a", fontSize: 8, marginTop: "auto", paddingTop: 14, textAlign: "right" },
  period: { color: "#5d5d5d", fontSize: 9, fontWeight: 700 },
  row: { display: "flex", flexDirection: "row", justifyContent: "space-between" },
  section: { marginBottom: 16 },
  sectionTitle: { borderBottom: "1 solid #7a7a7a", fontSize: 11, fontWeight: 900, marginBottom: 8, paddingBottom: 4, textTransform: "uppercase" },
  skill: { marginBottom: 4 },
  text: { color: "#222222", fontSize: 10, lineHeight: 1.55 },
  title: { fontSize: 11, fontWeight: 800 },
});

type Props = {
  resume: ResumeDocument;
};

function renderBlock(resume: ResumeDocument, block: ReturnType<typeof buildResumePages>[number]["blocks"][number]) {
  const renderSection = (children: ReactNode) =>
    block.isContinuation ? <View>{children}</View> : (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{block.title}</Text>
        {children}
      </View>
    );

  if (block.key === "summary" && block.text) {
    return renderSection(<Text style={styles.text}>{block.text}</Text>);
  }

  if (block.key === "experiences") {
    const items = resume.experiences.filter((item) => block.items?.includes(item.id));
    return renderSection(
      <>
        {items.map((experience) => (
          <View key={experience.id} style={styles.item}>
            <View style={styles.row}>
              <Text style={styles.title}>{experience.title}</Text>
              <Text style={styles.period}>{experience.period}</Text>
            </View>
            <Text style={styles.company}>
              {experience.companyName}
              {experience.location ? `, ${experience.location}` : ""}
            </Text>
            {experience.description ? <Text style={styles.text}>{experience.description}</Text> : null}
          </View>
        ))}
      </>,
    );
  }

  if (block.key === "education") {
    const items = resume.education.filter((item) => block.items?.includes(item.id));
    return renderSection(
      <>
        {items.map((education) => (
          <View key={education.id} style={styles.item}>
            <View style={styles.row}>
              <Text style={styles.title}>{education.degreeName}</Text>
              <Text style={styles.period}>{education.period}</Text>
            </View>
            <Text style={styles.company}>{education.schoolName}</Text>
            {education.fieldOfStudy ? <Text style={styles.location}>{education.fieldOfStudy}</Text> : null}
          </View>
        ))}
      </>,
    );
  }

  if (block.key === "skills") {
    const items = resume.skills.filter((item) => block.items?.includes(item));
    return renderSection(
      <>
        {items.map((skill) => (
          <Text key={skill} style={styles.skill}>• {skill}</Text>
        ))}
      </>,
    );
  }

  if (block.key === "certifications") {
    const items = resume.certifications.filter((item) => block.items?.includes(item.id));
    return renderSection(
      <>
        {items.map((certification) => (
          <Text key={certification.id} style={styles.certification}>
            • {certification.name}
            {certification.issuer ? ` · ${certification.issuer}` : ""}
          </Text>
        ))}
      </>,
    );
  }

  const items = resume.languages.filter((item) => block.items?.includes(item.id));
  return renderSection(
    <>
      {items.map((language) => (
        <Text key={language.id} style={styles.certification}>
          • {language.name}
          {language.proficiency ? ` · ${language.proficiency}` : ""}
        </Text>
      ))}
    </>,
  );
}

export function ResumePdfDocument({ resume }: Props) {
  const pages = buildResumePages(resume);
  const contactItems = [
    resume.basics.location,
    resume.basics.email,
    resume.basics.phone,
    `linkedin.com/in/${resume.basics.publicIdentifier}`,
  ].filter(Boolean);

  return (
    <Document title={`${resume.basics.fullName} Resume`}>
      {pages.map((page) => (
        <Page key={page.pageNumber} size="A4" style={styles.page}>
          {page.pageNumber === 1 ? (
            <View style={styles.header}>
              <Text style={styles.name}>{resume.basics.fullName}</Text>
              <Text style={styles.headline}>{resume.basics.headline}</Text>
              <Text style={styles.meta}>{contactItems.join(" | ")}</Text>
            </View>
          ) : null}
          {page.blocks.map((block, index) => (
            <View key={`${block.key}-${index}`}>{renderBlock(resume, block)}</View>
          ))}
          <Text style={styles.pageNumber}>
            {page.pageNumber} / {pages.length}
          </Text>
        </Page>
      ))}
    </Document>
  );
}
