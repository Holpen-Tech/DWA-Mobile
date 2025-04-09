import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

export default function AddLanguage() {
  const navigation = useNavigation();
  const route = useRoute();
  const { draftId, index } = route.params || {};

  const [form, setForm] = useState({
    language: "",
    speaking: "",
    reading: "",
    writing: "",
  });

  const levels = ["", "Basic", "Intermediate", "Advanced", "Fluent/Bilingual"];

  useEffect(() => {
    const load = async () => {
      const saved = await AsyncStorage.getItem("resume_drafts");
      const drafts = saved ? JSON.parse(saved) : [];
      const currentDraft = drafts.find((d) => d.id === draftId);

      if (index !== undefined && currentDraft?.languages?.[index]) {
        setForm(currentDraft.languages[index]);
      }
    };

    load();
  }, [draftId, index]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!form.language.trim()) {
      Alert.alert("Missing Info", "Please enter a language.");
      return;
    }

    const saved = await AsyncStorage.getItem("resume_drafts");
    const drafts = saved ? JSON.parse(saved) : [];
    const i = drafts.findIndex((d) => d.id === draftId);

    if (i !== -1) {
      const current = drafts[i];
      const updated = current.languages || [];

      if (index !== undefined) {
        updated[index] = form;
      } else {
        updated.push(form); 
      }

      current.languages = updated;
      drafts[i] = current;

      await AsyncStorage.setItem("resume_drafts", JSON.stringify(drafts));
      navigation.navigate("Languages", { draftId });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Language</Text>

      <Text style={styles.label}>Language</Text>
      <TextInput
        style={styles.input}
        value={form.language}
        onChangeText={(text) => handleChange("language", text)}
      />

      <Text style={styles.label}>Speaking Level</Text>
      <Picker
        selectedValue={form.speaking}
        onValueChange={(value) => handleChange("speaking", value)}
      >
        {levels.map((level, i) => (
          <Picker.Item key={i} label={level || "Select level"} value={level} />
        ))}
      </Picker>

      <Text style={styles.label}>Reading Level</Text>
      <Picker
        selectedValue={form.reading}
        onValueChange={(value) => handleChange("reading", value)}
      >
        {levels.map((level, i) => (
          <Picker.Item key={i} label={level || "Select level"} value={level} />
        ))}
      </Picker>

      <Text style={styles.label}>Writing Level</Text>
      <Picker
        selectedValue={form.writing}
        onValueChange={(value) => handleChange("writing", value)}
      >
        {levels.map((level, i) => (
          <Picker.Item key={i} label={level || "Select level"} value={level} />
        ))}
      </Picker>

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
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#213E64",
    marginTop: 20,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 6,
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
