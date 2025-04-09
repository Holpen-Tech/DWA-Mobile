import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddPosition() {
  const navigation = useNavigation();
  const route = useRoute();
  const { draftId, positionIndex } = route.params;
  const [form, setForm] = useState({
    jobTitle: "",
    employer: "",
    city: "",
    province: "",
    country: "",
    postalCode: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    current: false,
  });

  useEffect(() => {
    const loadPosition = async () => {
      const saved = await AsyncStorage.getItem("resume_drafts");
      const drafts = saved ? JSON.parse(saved) : [];
      const draft = drafts.find((d) => d.id === draftId);

      if (draft && draft.experience && draft.experience[positionIndex]) {
        setForm(draft.experience[positionIndex]);
      }
    };

    loadPosition();
  }, [draftId, positionIndex]);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSave = async () => {
    const saved = await AsyncStorage.getItem("resume_drafts");
    const drafts = saved ? JSON.parse(saved) : [];
    const index = drafts.findIndex((d) => d.id === draftId);

    if (index !== -1) {
      if (!drafts[index].experience) drafts[index].experience = [];

      if (positionIndex !== undefined) {
        drafts[index].experience[positionIndex] = form;
      } else {
        drafts[index].experience.push(form);
      }

      await AsyncStorage.setItem("resume_drafts", JSON.stringify(drafts));
    }

    navigation.navigate("AddResponsibilities", {
      draftId,
      positionIndex:
        positionIndex !== undefined
          ? positionIndex
          : drafts[index].experience.length - 1,
    });
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Position</Text>

      {[
        { label: "Job Title", key: "jobTitle", required: true },
        { label: "Employer", key: "employer" },
        { label: "City", key: "city" },
        { label: "Province/State", key: "province" },
        { label: "Country", key: "country" },
        { label: "Postal Code", key: "postalCode" },
      ].map((item) => (
        <View key={item.key}>
          <Text style={styles.label}>
            {item.label}
            {item.required && <Text style={{ color: "red" }}> *</Text>}
          </Text>
          <TextInput
            style={styles.input}
            value={form[item.key]}
            onChangeText={(text) => handleChange(item.key, text)}
          />
        </View>
      ))}

      {[
        { label: "Start Month", key: "startMonth" },
        { label: "Start Year", key: "startYear" },
        { label: "End Month", key: "endMonth" },
        { label: "End Year", key: "endYear" },
      ].map(({ label, key }) => (
       <View key={key}>
        <Text style={styles.label}>{label}</Text>

          {key.includes("Month") ? (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={form[key]}
                onValueChange={(value) => handleChange(key, value)}
              >
                <Picker.Item label="Select Month" value="" />
                {months.map((month) => (
                  <Picker.Item label={month} value={month} key={month} />
                ))}
              </Picker>
            </View>
          ) : (
            <TextInput
              style={styles.input}
              value={form[key]}
              onChangeText={(text) => handleChange(key, text)}
              keyboardType="numeric"
            />
          )}
        </View>
      ))}

      <View style={styles.switchContainer}>
        <Switch
          value={form.current}
          onValueChange={(value) => handleChange("current", value)}
        />
        <Text style={styles.label}>This is my current position</Text>
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
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#213E64",
    marginTop: 10,
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 5,
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
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