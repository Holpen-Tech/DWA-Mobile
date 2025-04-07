import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function AddVResponsibilities() {
  const navigation = useNavigation();
  const route = useRoute();
  const { draftId, index } = route.params;

  const [text, setText] = useState("\u2022 ");

  const handleChange = (input) => {
    if (
      input.length > text.length &&
      input.endsWith("\n") &&
      !input.endsWith("\n\u2022 ")
    ) {
      setText(input + "\u2022 ");
    } else {
      setText(input);
    }
  };

  const handleSave = async () => {
    const saved = await AsyncStorage.getItem("resume_drafts");
    const drafts = saved ? JSON.parse(saved) : [];
    const draftIndex = drafts.findIndex((d) => d.id === draftId);

    if (draftIndex !== -1 && drafts[draftIndex].volunteer?.[index]) {
      drafts[draftIndex].volunteer[index].responsibilities = text.trim();

      await AsyncStorage.setItem("resume_drafts", JSON.stringify(drafts));
      Keyboard.dismiss();
      navigation.navigate("Volunteer", { draftId });  
    } else {
      Alert.alert("Error", "Could not find volunteer entry to update.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Responsibilities</Text>

      <TextInput
        style={styles.input}
        multiline
        numberOfLines={10}
        value={text}
        onChangeText={handleChange}
        textAlignVertical="top"
        autoFocus
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save & Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.previewButton}
        onPress={() => Alert.alert("Preview", "Preview feature coming soon!")}
      >
        <Text style={styles.buttonText}>Preview Resume</Text>
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
  input: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 6,
    fontSize: 16,
    minHeight: 180,
  },
  saveButton: {
    backgroundColor: "#649A47",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
  },
  previewButton: {
    backgroundColor: "#213E64",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
