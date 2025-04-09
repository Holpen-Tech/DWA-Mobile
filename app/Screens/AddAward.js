import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect } from "react";

export default function AddAward() {
  const navigation = useNavigation();
  const route = useRoute();
  const { draftId, index } = route.params || {};

  const [form, setForm] = useState({
    title: "",
    organization: "",
    month: "",
    year: "",
    summary: "",
  });

  useEffect(() => {
    const loadAward = async () => {
      const saved = await AsyncStorage.getItem("resume_drafts");
      const drafts = saved ? JSON.parse(saved) : [];
      const current = drafts.find((d) => d.id === draftId);
      if (index !== undefined && current?.awards?.[index]) {
        setForm(current.awards[index]);
      }
    };

    loadAward();
  }, [draftId, index]);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      Alert.alert("Missing Info", "Award Name is required.");
      return;
    }

    const saved = await AsyncStorage.getItem("resume_drafts");
    const drafts = saved ? JSON.parse(saved) : [];
    const i = drafts.findIndex((d) => d.id === draftId);

    if (i !== -1) {
      const current = drafts[i];
      const updated = current.awards || [];

      if (index !== undefined) {
        updated[index] = form; 
      } else {
        updated.push(form); 
      }

      current.awards = updated;
      drafts[i] = current;

      await AsyncStorage.setItem("resume_drafts", JSON.stringify(drafts));
      navigation.navigate("Awards", { draftId });
    }
  };

  const months = [
    "",
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={async () => {           
            navigation.navigate("ResumeBuilder", { draftId });
          }}
        >
          <Text style={{ color: "#213E64", fontWeight: "bold" }}>
            Back to Resume
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, draftId]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Award</Text>

      <Text style={styles.label}>Award Name *</Text>
      <TextInput
        style={styles.input}
        value={form.title}
        onChangeText={(text) => handleChange("title", text)}
      />

      <Text style={styles.label}>Award Organization</Text>
      <TextInput
        style={styles.input}
        value={form.organization}
        onChangeText={(text) => handleChange("organization", text)}
      />

      <Text style={styles.label}>Month</Text>
      <Picker
        selectedValue={form.month}
        onValueChange={(value) => handleChange("month", value)}
      >
        {months.map((month, i) => (
          <Picker.Item key={i} label={month || "Select month"} value={month} />
        ))}
      </Picker>

      <Text style={styles.label}>Year</Text>
      <TextInput
        style={styles.input}
        value={form.year}
        onChangeText={(text) => handleChange("year", text)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Summary</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        value={form.summary}
        onChangeText={(text) => handleChange("summary", text)}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />

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
    fontSize: 15,
    fontWeight: "600",
    color: "#213E64",
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 6,
    fontSize: 16,
  },
  multiline: {
    minHeight: 100,
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
