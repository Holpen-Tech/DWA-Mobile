import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function Templates() {
  const { draftId } = useRoute().params;
  const navigation = useNavigation();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResume = async () => {
      const saved = await AsyncStorage.getItem("resume_drafts");
      const drafts = saved ? JSON.parse(saved) : [];
      const draft = drafts.find((d) => d.id === draftId);
      setResume(draft);
      setLoading(false);
    };

    loadResume();
  }, [draftId]);

  if (loading || !resume) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#213E64" />
      </View>
    );
  }

  const Section = ({ title, children }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const handleEdit = () => {
    navigation.navigate("PersonalDetails", { draftId });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headline}>{resume.personalDetails?.headline}</Text>
      <Text style={styles.name}>
        {resume.personalDetails?.firstName} {resume.personalDetails?.lastName}
      </Text>
      <Text style={styles.contact}>
        {resume.personalDetails?.email} | {resume.personalDetails?.phone}
      </Text>
      <Text style={styles.contact}>
        {resume.personalDetails?.address}, {resume.personalDetails?.city}, {resume.personalDetails?.province}, {resume.personalDetails?.country} {resume.personalDetails?.postalCode}
      </Text>

      {resume.summary && (
        <Section title="Summary">
          <Text>{resume.summary}</Text>
        </Section>
      )}

      {resume.experience?.length > 0 && (
        <Section title="Experience">
          {resume.experience.map((pos, i) => (
            <View key={i} style={styles.entry}>
              <Text style={styles.entryTitle}>{pos.jobTitle || "Job Title"}</Text>
              <Text style={styles.entrySubtitle}>{pos.employer || "Employer Name"}</Text>
              <Text style={styles.entrySubtitle}>{pos.city || ""}, {pos.province || ""} {pos.postalCode || ""}</Text>
              <Text style={styles.entrySubtitle}>
                {(pos.startMonth || "")} {pos.startYear || ""} – {pos.current ? "Current" : `${pos.endMonth || ""} ${pos.endYear || ""}`}
              </Text>
              {pos.responsibilities?.split("\n").filter((line) => line.trim() !== "").map((line, idx) => (
                <Text key={idx} style={styles.bulletPoint}>{line}</Text>
              ))}
            </View>
          ))}
        </Section>
      )}

      {resume.skills && (
        <Section title="Skills">
          <Text style={styles.inlineList}>
            {(Array.isArray(resume.skills) ? resume.skills : resume.skills.split(/[,\u2022\n]/))
              .map((skill) => skill.trim())
              .filter((skill) => skill)
              .join(" • ")}
          </Text>
        </Section>
      )}

      {resume.education?.length > 0 && (
        <Section title="Education">
          {resume.education.map((edu, i) => (
            <View key={i} style={styles.entry}>
              <Text style={styles.entryTitle}>{edu.schoolName}</Text>
              {edu.fieldOfStudy ? <Text style={styles.entrySubtitle}>{edu.fieldOfStudy}</Text> : null}
              {edu.degree ? <Text style={styles.entrySubtitle}>{edu.degree}</Text> : null}
              <Text style={styles.entrySubtitle}>{edu.city}, {edu.country}</Text>
              <Text style={styles.entrySubtitle}>{edu.startMonth} {edu.startYear} – {edu.current ? "Current" : `${edu.endMonth} ${edu.endYear}`}</Text>
              {edu.description ? <Text style={styles.entryText}>{edu.description}</Text> : null}
              {edu.courses?.length > 0 && (
                <View style={styles.bulletList}>
                  {edu.courses.map((course, idx) => (
                    <Text key={idx} style={styles.bulletItem}>
                      • {course}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          ))}
        </Section>
      )}

      {resume.sections?.awards && resume.awards?.length > 0 && (
        <Section title="Awards">
          {resume.awards.map((award, i) => (
            <View key={i} style={styles.entry}>
              {award.title ? <Text style={styles.entryTitle}>{award.title}</Text> : null}
              {award.organization ? <Text style={styles.entrySubtitle}>{award.organization}</Text> : null}
              {(award.startMonth || award.startYear) ? (
                <Text style={styles.entrySubtitle}>{[award.startMonth, award.startYear].filter(Boolean).join(" ")}</Text>
              ) : null}
              {award.summary ? <Text style={styles.entryText}>{award.summary}</Text> : null}
            </View>
          ))}
        </Section>
      )}

      {resume.sections?.volunteer && resume.volunteer?.length > 0 && (
        <Section title="Volunteer Experience">
          {resume.volunteer.map((pos, i) => (
            <View key={i} style={styles.entry}>
              {pos.organization ? <Text style={styles.entryTitle}>{pos.organization}</Text> : null}
              {pos.jobTitle ? <Text style={styles.entrySubtitle}>{pos.jobTitle}</Text> : null}
              {(pos.city || pos.postalCode) && (
                <Text style={styles.entrySubtitle}>{[pos.city, pos.postalCode].filter(Boolean).join(", ")}</Text>
              )}
              {(pos.startMonth || pos.startYear || pos.endMonth || pos.endYear || pos.current) && (
                <Text style={styles.entrySubtitle}>
                  {[pos.startMonth, pos.startYear].filter(Boolean).join(" ")} – {pos.current ? "Current" : [pos.endMonth, pos.endYear].filter(Boolean).join(" ")}
                </Text>
              )}
              {pos.responsibilities && pos.responsibilities.split("\u2022").filter((r) => r.trim() !== "").map((r, idx) => (
                <Text key={idx} style={styles.bullet}>
                  • {r.trim()}
                </Text>
              ))}
            </View>
          ))}
        </Section>
      )}

      {resume.sections?.languages && resume.languages?.length > 0 && (
        <Section title="Languages">
          {resume.languages.map((lang, i) => (
            <View key={i} style={styles.entry}>
              {lang.language && <Text style={styles.entryTitle}>{lang.language}</Text>}
              {lang.speaking && <Text style={styles.entrySubtitle}>Speaking : {lang.speaking} Skill Level</Text>}
              {lang.reading && <Text style={styles.entrySubtitle}>Reading : {lang.reading} Skill Level</Text>}
              {lang.writing && <Text style={styles.entrySubtitle}>Writing : {lang.writing} Skill Level</Text>}
            </View>
          ))}
        </Section>
      )}

      {resume.sections?.references && resume.references?.length > 0 && (
        <Section title="References">
          {resume.references.map((ref, i) => (
            <View key={i} style={styles.entry}>
              {ref.name && <Text style={styles.entryTitle}>{ref.name}</Text>}
              {ref.relationship && <Text style={styles.entrySubtitle}>{ref.relationship}</Text>}
              {ref.organization && <Text style={styles.entrySubtitle}>Organization: {ref.organization}</Text>}
              {ref.position && <Text style={styles.entrySubtitle}>Position: {ref.position}</Text>}
              {ref.email && <Text style={styles.entrySubtitle}>{ref.email}</Text>}
              {ref.phone && <Text style={styles.entrySubtitle}>{ref.phone}</Text>}
            </View>
          ))}
        </Section>
      )}

      {resume.sections?.custom && resume.custom && (
        <Section title="Additional Information">
          <Text>{resume.custom}</Text>
        </Section>
      )}

      <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
        <Text style={styles.editText}>Edit Resume</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 25, backgroundColor: "#fff", flexGrow: 1 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  headline: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    color: "#444",
    marginBottom: 5,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#213E64",
  },
  contact: { textAlign: "center", marginBottom: 5, color: "#666" },
  section: { marginTop: 30 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#213E64",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 5,
  },
  entry: { marginBottom: 15 },
  entryTitle: { fontWeight: "bold", fontSize: 16, color: "#213E64" },
  entrySubtitle: { fontSize: 14, color: "#555" },
  editButton: {
    backgroundColor: "#649A47",
    marginTop: 40,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  editText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
