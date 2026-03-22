import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import type { GeneratedPaper } from '@/types';

const DIFFICULTY_LABELS: Record<string, string> = {
  easy: 'Easy',
  medium: 'Moderate',
  hard: 'Challenging',
};

// Figma tokens (px → pt ≈ 0.75x):
// School name: 32px/700/160% → 24pt bold
// Meta/Instructions/StudentInfo: 18px/600/160% → 13.5pt semibold
// Section title: 24px/600/160% center → 18pt
// Questions + Answer key: 16px/400/240% → 12pt normal
// Color: #303030 everywhere, letterSpacing: -0.04em

const styles = StyleSheet.create({
  page: {
    padding: '32 24',
    fontFamily: 'Helvetica',
    fontSize: 12,
    color: '#303030',
    letterSpacing: -0.48,
  },
  header: {
    textAlign: 'center',
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#303030',
    paddingBottom: 12,
  },
  schoolName: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    lineHeight: 1.6,
  },
  headerInfo: {
    fontSize: 13.5,
    fontFamily: 'Helvetica-Bold',
    lineHeight: 1.6,
    marginTop: 2,
  },
  bold: {
    fontFamily: 'Helvetica-Bold',
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 13.5,
    fontFamily: 'Helvetica-Bold',
    lineHeight: 1.6,
    marginBottom: 6,
  },
  instruction: {
    fontSize: 13.5,
    fontFamily: 'Helvetica-Bold',
    lineHeight: 1.6,
    marginBottom: 4,
  },
  studentInfo: {
    marginBottom: 12,
    fontSize: 13.5,
    fontFamily: 'Helvetica-Bold',
    lineHeight: 1.6,
  },
  studentInfoRow: {
    marginBottom: 0,
  },
  section: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    lineHeight: 1.6,
    textAlign: 'center',
    marginBottom: 4,
  },
  sectionInstruction: {
    fontSize: 13.5,
    fontFamily: 'Helvetica-Bold',
    lineHeight: 1.6,
    marginBottom: 8,
  },
  questionsBlock: {
    fontSize: 12,
    lineHeight: 2.4,
  },
  question: {
    marginBottom: 0,
  },
  questionText: {
    fontSize: 12,
    lineHeight: 2.4,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 18,
    lineHeight: 2.0,
  },
  option: {
    width: '50%',
    fontSize: 12,
    lineHeight: 2.0,
  },
  divider: {
    textAlign: 'center',
    fontSize: 13.5,
    fontFamily: 'Helvetica-Bold',
    borderTopWidth: 1,
    borderTopColor: '#303030',
    paddingTop: 10,
    marginTop: 16,
    lineHeight: 1.6,
  },
  answerKey: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: '#303030',
  },
  answerKeyTitle: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 1.6,
  },
  answerItem: {
    fontSize: 12,
    lineHeight: 2.4,
  },
});

export default function PaperPDF({ paper }: { paper: GeneratedPaper }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.schoolName}>{paper.schoolName}</Text>
          <Text style={styles.headerInfo}>
            <Text style={styles.bold}>Subject: </Text>{paper.subject}
          </Text>
          <Text style={styles.headerInfo}>
            <Text style={styles.bold}>Class: </Text>{paper.class}
          </Text>
        </View>

        {/* Meta */}
        <View style={styles.meta}>
          <Text><Text style={styles.bold}>Time Allowed: </Text>{paper.time}</Text>
          <Text><Text style={styles.bold}>Maximum Marks: </Text>{paper.maxMarks}</Text>
        </View>

        {/* Instructions */}
        {paper.instructions && paper.instructions.length > 0 && (
          <View>
            {paper.instructions.map((inst, i) => (
              <Text key={i} style={styles.instruction}>{inst}</Text>
            ))}
          </View>
        )}

        {/* Student Info */}
        <View style={styles.studentInfo}>
          <Text style={styles.studentInfoRow}>Name: ______________________</Text>
          <Text style={styles.studentInfoRow}>Roll Number: ________________</Text>
          <Text style={styles.studentInfoRow}>Class: {paper.class} Section: __________</Text>
        </View>

        {/* Sections */}
        {paper.sections.map((section, si) => (
          <View key={si} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionInstruction}>{section.instruction}</Text>

            <View style={styles.questionsBlock}>
              {section.questions.map((q) => {
                const diffLabel = q.difficulty ? DIFFICULTY_LABELS[q.difficulty] : null;
                return (
                  <View key={q.number} style={styles.question}>
                    <Text style={styles.questionText}>
                      {diffLabel && <Text>[{diffLabel}] </Text>}
                      {q.text} [{q.marks} Marks]
                    </Text>
                    {q.options && q.options.length > 0 && (
                      <View style={styles.optionsGrid}>
                        {q.options.map((opt, oi) => (
                          <Text key={oi} style={styles.option}>
                            ({String.fromCharCode(97 + oi)}) {opt}
                          </Text>
                        ))}
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        ))}

        {/* End Divider */}
        <Text style={styles.divider}>End of Question Paper</Text>

        {/* Answer Key */}
        {paper.answerKey && paper.answerKey.length > 0 && (
          <View style={styles.answerKey} break>
            <Text style={styles.answerKeyTitle}>Answer Key</Text>
            {paper.answerKey.map((a) => (
              <Text key={a.questionNumber} style={styles.answerItem}>
                <Text style={styles.bold}>{a.questionNumber}.</Text> {a.answer}
              </Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
