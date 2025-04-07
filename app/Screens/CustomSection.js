import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  BackHandler,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";

export default function CustomSection() {
  const navigation = useNavigation();
  const route = useRoute();
  const { draftId } = route.params;
  const [content, setContent] = useState("");

  useEffect(() => {
    const loadCustom = async () => {
      const saved = await AsyncStorage.getItem("resume_drafts");
      const drafts = saved ? JSON.parse(saved) : [];
      const current = drafts.find((d) => d.id === draftId);
      if (current?.custom) {
        setContent(current.custom);
      }
    };

    loadCustom();
  }, [draftId]);

  const handleSave = async () => {
    const saved = await AsyncStorage.getItem("resume_drafts");
    const drafts = saved ? JSON.parse(saved) : [];
    const index = drafts.findIndex((d) => d.id === draftId);

    if (index !== -1) {
      drafts[index].custom = content;
      await AsyncStorage.setItem("resume_drafts", JSON.stringify(drafts));

      const sectionOrder = ["awards", "volunteer", "languages", "references", "custom"];
      const nextScreenMap = {
        awards: "Awards",
        volunteer: "Volunteer",
        languages: "Languages",
        references: "References",
        custom: "CustomSection",
      };

      const selected = drafts[index].sections || {};
      const enabledSections = sectionOrder.filter((key) => selected[key]);

      const currentIndex = enabledSections.indexOf("custom");
      const nextKey = enabledSections[currentIndex + 1];

      if (nextKey) {
        navigation.navigate(nextScreenMap[nextKey], { draftId });
      } else {
        navigation.navigate("Templates", { draftId });
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const loadBackNavigation = async () => {
        const saved = await AsyncStorage.getItem("resume_drafts");
        const drafts = saved ? JSON.parse(saved) : [];
        const current = drafts.find((d) => d.id === draftId);
        const selected = current?.sections || {};

        const sectionOrder = ["awards", "volunteer", "languages", "references", "custom"];
        const enabledSections = sectionOrder.filter((key) => selected[key]);

        const currentIndex = enabledSections.indexOf("custom");
        const previousKey = enabledSections[currentIndex - 1];

        const screenMap = {
          awards: "Awards",
          volunteer: "Volunteer",
          languages: "Languages",
          references: "References",
        };

        const onBackPress = () => {
          if (previousKey) {
            navigation.navigate(screenMap[previousKey], { draftId });
          } else {
            navigation.navigate("AddSection", { draftId });
          }
          return true;
        };

        BackHandler.addEventListener("hardwareBackPress", onBackPress);
        return () =>
          BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };

      loadBackNavigation();
    }, [navigation, draftId])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Custom Section</Text>
        <TouchableOpacity onPress={() => navigation.navigate("ResumeBuilder", { draftId })}>
          <Text style={styles.backToResume}>Back to Resume</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Add content here</Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={6}
        textAlignVertical="top"
        value={content}
        onChangeText={setContent}
        placeholder="Add any additional information you'd like to include"
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save & Continue</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#213E64",
  },
  backToResume: {
    fontSize: 14,
    color: "#213E64",
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#213E64",
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#f2f2f2",
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    minHeight: 120,
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
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
