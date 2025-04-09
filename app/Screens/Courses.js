import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Keyboard,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Courses() {
  const navigation = useNavigation();
  const route = useRoute();
  const { draftId } = route.params;

  const [courses, setCourses] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const loadCourses = async () => {
      const saved = await AsyncStorage.getItem("resume_drafts");
      const drafts = saved ? JSON.parse(saved) : [];
      const current = drafts.find((d) => d.id === draftId);
      if (current?.courses) {
        setCourses(current.courses);
      }
    };

    loadCourses();
  }, [draftId]);

  const handleAddCourse = () => {
    const trimmed = input.trim();
    if (trimmed && !courses.includes(trimmed)) {
      setCourses([...courses, trimmed]);
    }
    setInput("");
    Keyboard.dismiss();
  };

  const handleRemoveCourse = (courseToRemove) => {
    setCourses(courses.filter((c) => c !== courseToRemove));
  };

  const handleSave = async () => {
    const saved = await AsyncStorage.getItem("resume_drafts");
    const drafts = saved ? JSON.parse(saved) : [];
    const index = drafts.findIndex((d) => d.id === draftId);

    if (index !== -1) {
      drafts[index].courses = courses;
      await AsyncStorage.setItem("resume_drafts", JSON.stringify(drafts));
      Alert.alert("Saved", "Courses saved successfully!");
      navigation.navigate("Education", { draftId });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Education</Text>
      <Text style={styles.subtitle}>Add Courses</Text>

      <TextInput
        style={styles.input}
        placeholder="Type a course and press Enter"
        value={input}
        onChangeText={setInput}
        onSubmitEditing={handleAddCourse}
        returnKeyType="done"
      />

      <View style={styles.tagContainer}>
        {courses.map((course, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{course}</Text>
            <TouchableOpacity onPress={() => handleRemoveCourse(course)}>
              <Text style={styles.tagRemove}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save & Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#213E64",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#213E64",
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 6,
    fontSize: 16,
    marginBottom: 20,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e1ecf4",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  tagText: {
    color: "#213E64",
    fontWeight: "600",
    marginRight: 8,
  },
  tagRemove: {
    color: "#213E64",
    fontWeight: "bold",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#649A47",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
