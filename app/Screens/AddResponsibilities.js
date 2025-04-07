import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddResponsibilities() {
  const navigation = useNavigation();
  const route = useRoute();
  const { draftId, positionIndex } = route.params;
  const [text, setText] = useState("\u2022 "); 

  useEffect(() => {
    const loadResponsibilities = async () => {
      const saved = await AsyncStorage.getItem("resume_drafts");
      const drafts = saved ? JSON.parse(saved) : [];
      const index = drafts.findIndex((d) => d.id === draftId);
      if (index !== -1) {
        const existing = drafts[index].experience?.[positionIndex]?.responsibilities;
        if (existing) setText(existing);
      }
    };
    loadResponsibilities();
  }, [draftId, positionIndex]);

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
    try {
      const saved = await AsyncStorage.getItem("resume_drafts");
      const drafts = saved ? JSON.parse(saved) : [];
      const index = drafts.findIndex((d) => d.id === draftId);

      if (index !== -1) {
        const experience = drafts[index].experience || [];
        const position = experience[positionIndex];

        if (position) {
          position.responsibilities = text.trim();
          drafts[index].experience[positionIndex] = position;

          await AsyncStorage.setItem("resume_drafts", JSON.stringify(drafts));
          console.log("Responsibilities saved!");
        } else {
          console.warn("Position not found at index:", positionIndex);
        }
      }

      Keyboard.dismiss();
      navigation.navigate("Experience", { draftId });
    } catch (error) {
      console.error("Error saving responsibilities:", error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Responsibilities</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("ResumeBuilder", { draftId })}
        >
          <Text style={styles.resumeLink}>Back to Resume</Text>
        </TouchableOpacity>
      </View>

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#fff",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#213E64",
  },
  resumeLink: {
    color: "#213E64",
    fontWeight: "bold",
    fontSize: 14,
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
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
