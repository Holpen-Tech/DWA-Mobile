import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

export default function AddVPosition() {
  const navigation = useNavigation();
  const route = useRoute();
  const { draftId, index } = route.params || {};

  const [form, setForm] = useState({
    jobTitle: "",
    organization: "",
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
    const load = async () => {
      const saved = await AsyncStorage.getItem("resume_drafts");
      const drafts = saved ? JSON.parse(saved) : [];
      const currentDraft = drafts.find((d) => d.id === draftId);

      if (index !== undefined && currentDraft?.volunteer?.[index]) {
        setForm(currentDraft.volunteer[index]);
      }
    };

    load();
  }, [draftId, index]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!form.jobTitle.trim()) {
      Alert.alert("Missing Info", "Position is required.");
      return;
    }

    const saved = await AsyncStorage.getItem("resume_drafts");
    const drafts = saved ? JSON.parse(saved) : [];
    const i = drafts.findIndex((d) => d.id === draftId);

    if (i !== -1) {
      const current = drafts[i];
      const updated = current.volunteer || [];

      if (index !== undefined) {
        updated[index] = form; 
      } else {
        updated.push(form); 
      }

      current.volunteer = updated;
      drafts[i] = current;

      await AsyncStorage.setItem("resume_drafts", JSON.stringify(drafts));
      const newIndex = index !== undefined ? index : updated.length - 1;
      navigation.navigate("AddVResponsibilities", { draftId, index: newIndex });
    }
  };

  const months = [
    "", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Volunteer Position</Text>

      {[
        ["Position *", "jobTitle"],
        ["Organization", "organization"],
        ["City", "city"],
        ["Province/State", "province"],
        ["Country", "country"],
        ["Postal Code", "postalCode"],
      ].map(([label, key]) => (
        <View key={key} style={styles.fieldBlock}>
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
        {months.map((month, i) => (
          <Picker.Item key={i} label={month || "Select Month"} value={month} />
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
        {months.map((month, i) => (
          <Picker.Item key={i} label={month || "Select Month"} value={month} />
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
        <Text style={styles.switchLabel}>This is my current position</Text>
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
    paddingBottom: 50,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#213E64",
    marginBottom: 20,
  },
  fieldBlock: {
    marginBottom: 15,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#213E64",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 6,
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
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
