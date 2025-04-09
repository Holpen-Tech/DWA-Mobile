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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { Switch } from "react-native";

export default function AddEducation() {
  const navigation = useNavigation();
  const route = useRoute();
  const { draftId, index } = route.params;

  const [form, setForm] = useState({
    schoolName: "",
    degree: "",
    fieldOfStudy: "",
    city: "",
    province: "",
    country: "",
    postalCode: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    current: false,
    description: "",
  });

  useEffect(() => {
    const load = async () => {
      const saved = await AsyncStorage.getItem("resume_drafts");
      const drafts = saved ? JSON.parse(saved) : [];
      const currentDraft = drafts.find((d) => d.id === draftId);

      if (index !== undefined && currentDraft?.education?.[index]) {
        setForm(currentDraft.education[index]);
      }
    };

    load();
  }, [draftId, index]);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSave = async () => {
    if (!form.schoolName.trim()) {
      Alert.alert("Required", "School Name is required.");
      return;
    }

    const saved = await AsyncStorage.getItem("resume_drafts");
    const drafts = saved ? JSON.parse(saved) : [];
    const i = drafts.findIndex((d) => d.id === draftId);

    if (i !== -1) {
      const current = drafts[i];
      const updated = current.education || [];

      if (index !== undefined) {
        updated[index] = form; 
      } else {
        updated.push(form); 
      }

      current.education = updated;
      drafts[i] = current;

      await AsyncStorage.setItem("resume_drafts", JSON.stringify(drafts));
      navigation.navigate("Courses", { draftId });
    }
  };

  const months = [
    "", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Education</Text>

      {[
        ["School Name *", "schoolName"],
        ["Degree / Diploma / Certificate", "degree"],
        ["Field of Study", "fieldOfStudy"],
        ["City", "city"],
        ["Province/State", "province"],
        ["Country", "country"],
        ["Postal/Zip Code", "postalCode"],
      ].map(([label, key]) => (
        <View key={key}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={styles.input}
            value={form[key]}
            onChangeText={(text) => handleChange(key, text)}
          />
        </View>
      ))}

      <Text style={styles.label}>Start Month</Text>
      <Picker
        selectedValue={form.startMonth}
        onValueChange={(value) => handleChange("startMonth", value)}
      >
        {months.map((month) => (
          <Picker.Item key={month} label={month || "Select month"} value={month} />
        ))}
      </Picker>

      <Text style={styles.label}>Start Year</Text>
      <TextInput
        style={styles.input}
        value={form.startYear}
        onChangeText={(text) => handleChange("startYear", text)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>End Month</Text>
      <Picker
        enabled={!form.current}
        selectedValue={form.endMonth}
        onValueChange={(value) => handleChange("endMonth", value)}
      >
        {months.map((month) => (
          <Picker.Item key={month} label={month || "Select month"} value={month} />
        ))}
      </Picker>

      <Text style={styles.label}>End Year</Text>
      <TextInput
        style={styles.input}
        value={form.endYear}
        onChangeText={(text) => handleChange("endYear", text)}
        keyboardType="numeric"
        editable={!form.current}
      />

      <View style={styles.switchContainer}>
        <Switch
          value={form.current}
          onValueChange={(val) => handleChange("current", val)}
        />
        <Text style={styles.switchLabel}>This is my current study</Text>
      </View>

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.description]}
        multiline
        numberOfLines={4}
        value={form.description}
        onChangeText={(text) => handleChange("description", text)}
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
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 6,
    fontSize: 16,
  },
  description: {
    minHeight: 120,
    marginTop: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  switchLabel: {
    marginLeft: 10,
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
