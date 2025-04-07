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
import { useFocusEffect } from "@react-navigation/native";
import { BackHandler } from "react-native";

export default function PersonalDetails({ navigation, route }) {
  const { draftId } = route.params;
  const [form, setForm] = useState({
    headline: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    country: "",
    postalCode: "",
  });

  useEffect(() => {
    const loadDraft = async () => {
      const saved = await AsyncStorage.getItem("resume_drafts");
      const drafts = saved ? JSON.parse(saved) : [];
      const thisDraft = drafts.find((d) => d.id === draftId);
      if (thisDraft && thisDraft.personalDetails) {
        setForm(thisDraft.personalDetails);
      }
    };

    loadDraft();
  }, [draftId]);

  const handleSave = async () => {
    if (!form.firstName || !form.lastName) {
      Alert.alert("Missing Info", "First and last name are required.");
      return;
    }

    const saved = await AsyncStorage.getItem("resume_drafts");
    let drafts = saved ? JSON.parse(saved) : [];
    const index = drafts.findIndex((d) => d.id === draftId);
    if (index !== -1) {
      drafts[index].personalDetails = form;
    }

    await AsyncStorage.setItem("resume_drafts", JSON.stringify(drafts));
    navigation.navigate("Summary", { draftId });
  };

  const handleBackToResume = () => {
    navigation.navigate("ResumeBuilder", { draftId });
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("ResumeBuilder");
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  const renderField = (label, field, keyboardType = "default") => (
    <View style={styles.inputGroup} key={field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={form[field]}
        onChangeText={(text) => setForm({ ...form, [field]: text })}
        keyboardType={keyboardType}
      />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Personal Details</Text>
        <TouchableOpacity onPress={handleBackToResume}>
          <Text style={styles.backLink}>Back to Resume</Text>
        </TouchableOpacity>
      </View>

      {renderField("Resume Headline", "headline")}
      {renderField("First Name *", "firstName")}
      {renderField("Last Name *", "lastName")}
      {renderField("Email Address", "email", "email-address")}
      {renderField("Phone Number", "phone", "phone-pad")}
      {renderField("Street Address", "address")}
      {renderField("City", "city")}
      {renderField("Province/State", "province")}
      {renderField("Country", "country")}
      {renderField("Postal Code", "postalCode")}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save & Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 50, backgroundColor: "#fff" },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#213E64",
  },
  backLink: {
    color: "#213E64",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  inputGroup: { marginBottom: 15 },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#213E64",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 14,
    borderRadius: 6,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#649A47",
    padding: 15,
    borderRadius: 8,
    marginRight: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
