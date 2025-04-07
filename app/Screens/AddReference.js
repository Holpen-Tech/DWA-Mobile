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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function AddReference() {
  const navigation = useNavigation();
  const route = useRoute();
  const { draftId, index } = route.params || {};

  const [form, setForm] = useState({
    availableOnRequest: false,
    name: "",
    relationship: "",
    organization: "",
    position: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const load = async () => {
      const saved = await AsyncStorage.getItem("resume_drafts");
      const drafts = saved ? JSON.parse(saved) : [];
      const current = drafts.find((d) => d.id === draftId);

      if (index !== undefined && current?.references?.[index]) {
        setForm(current.references[index]);
      }
    };

    load();
  }, [draftId, index]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    const saved = await AsyncStorage.getItem("resume_drafts");
    const drafts = saved ? JSON.parse(saved) : [];
    const i = drafts.findIndex((d) => d.id === draftId);

    if (i !== -1) {
      const current = drafts[i];
      const updated = current.references || [];

      if (index !== undefined) {
        updated[index] = form;
      } else {
        updated.push(form);
      }

      current.references = updated;
      drafts[i] = current;

      await AsyncStorage.setItem("resume_drafts", JSON.stringify(drafts));
      navigation.navigate("References", { draftId });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Reference</Text>

      <View style={styles.switchContainer}>
        <Switch
          value={form.availableOnRequest}
          onValueChange={(val) => handleChange("availableOnRequest", val)}
        />
        <Text style={styles.switchLabel}>Available Upon Request</Text>
      </View>

      {[["Name", "name"], ["Relationship", "relationship"], ["Organization", "organization"], ["Position", "position"], ["Phone Number", "phone"], ["Email", "email"]].map(
        ([label, key]) => (
          <View key={key} style={styles.fieldBlock}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
              style={styles.input}
              value={form[key]}
              onChangeText={(text) => handleChange(key, text)}
              keyboardType={key === "email" ? "email-address" : key === "phone" ? "phone-pad" : "default"}
            />
          </View>
        )
      )}

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
    marginBottom: 20,
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
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
