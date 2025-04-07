import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";

export default function PreviewResume() {
  const route = useRoute();
  const { draftId } = route.params;
  const [draft, setDraft] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDraft = async () => {
      const saved = await AsyncStorage.getItem("resume_drafts");
      const drafts = saved ? JSON.parse(saved) : [];
      const current = drafts.find((d) => d.id === draftId);
      setDraft(current);
      setLoading(false);
    };

    loadDraft();
  }, [draftId]);

  if (loading || !draft) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#213E64" />
      </View>
    );
  }

  const {
    headline,
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    province,
    country,
    postalCode,
    summary,
    experience,
    skills,
    education,
    courses,
    sections,
  } = draft;

  const formatDateRange = (start, end, current) => {
    const from = start || "Unknown";
    const to = current ? "Current" : end || "Unknown";
    return `${from} - ${to}`;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.name}>{firstName} {lastName}</Text>
      {headline ? <Text style={styles.headline}>{headline}</Text> : null}
      <Text style={styles.contact}>
        {email} | {phone}
      </Text>
      <Text style={styles.contact}>
        {address}, {city}, {province}, {country} {postalCode}
      </Text>

      {summary ? (
        <>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.text}>{summary}</Text>
        </>
      ) : null}

      {experience && experience.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Experience</Text>
          {experience.map((job, index) => (
            <View key={index} style={styles.subSection}>
              <Text style={styles.boldText}>{job.jobTitle}</Text>
              <Text style={styles.text}>{job.company}</Text>
              <Text style={styles.text}>
                {job.city}, {job.province} ({formatDateRange(job.startYear, job.endYear, job.current)})
              </Text>
              {job.responsibilities?.split("\n").map((line, i) => (
                <Text key={i} style={styles.bullet}>• {line.trim()}</Text>
              ))}
            </View>
          ))}
        </>
      )}

      {skills ? (
        <>
          <Text style={styles.sectionTitle}>Skills</Text>
          <Text style={styles.text}>{skills}</Text>
        </>
      ) : null}

      {education && education.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Education</Text>
          {education.map((school, index) => (
            <View key={index} style={styles.subSection}>
              <Text style={styles.boldText}>{school.schoolName}</Text>
              <Text style={styles.text}>{school.degree} in {school.fieldOfStudy}</Text>
              <Text style={styles.text}>
                {school.city}, {school.province} ({formatDateRange(school.startYear, school.endYear, school.current)})
              </Text>
              {school.description ? <Text style={styles.text}>{school.description}</Text> : null}
            </View>
          ))}
        </>
      )}

      {courses && courses.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Courses</Text>
          <Text style={styles.text}>{courses.join(", ")}</Text>
        </>
      )}

      {sections?.awards && <Text style={styles.sectionTitle}>Awards (Coming Soon)</Text>}
      {sections?.volunteer && <Text style={styles.sectionTitle}>Volunteer Experience (Coming Soon)</Text>}
      {sections?.languages && <Text style={styles.sectionTitle}>Languages (Coming Soon)</Text>}
      {sections?.references && <Text style={styles.sectionTitle}>References (Coming Soon)</Text>}
      {sections?.custom && <Text style={styles.sectionTitle}>Custom Section (Coming Soon)</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#213E64",
    textAlign: "center",
  },
  headline: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 8,
    color: "#555",
  },
  contact: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 25,
    marginBottom: 10,
    color: "#213E64",
  },
  subSection: {
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  boldText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#213E64",
  },
  bullet: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
});
