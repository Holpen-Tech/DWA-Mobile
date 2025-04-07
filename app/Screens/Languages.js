import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  BackHandler,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import CheckBox from "expo-checkbox";

export default function Languages() {
  const navigation = useNavigation();
  const route = useRoute();
  const { draftId } = route.params;

  const [languages, setLanguages] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    const loadLanguages = async () => {
      const saved = await AsyncStorage.getItem("resume_drafts");
      const drafts = saved ? JSON.parse(saved) : [];
      const current = drafts.find((d) => d.id === draftId);
      if (current?.languages) {
        setLanguages(current.languages);
      }
    };

    loadLanguages();
  }, [draftId]);

  const toggleDeleteMode = () => {
    const selectedIndices = Object.keys(selected).filter((key) => selected[key]).map(Number);

    if (deleting) {
      if (selectedIndices.length === 0) {
        setDeleting(false);
        return;
      }

      Alert.alert(
        "Confirm Deletion",
        "Are you sure you want to delete the selected entries?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Yes",
            style: "destructive",
            onPress: async () => {
              const saved = await AsyncStorage.getItem("resume_drafts");
              const drafts = saved ? JSON.parse(saved) : [];
              const index = drafts.findIndex((d) => d.id === draftId);

              if (index !== -1) {
                const updated = drafts[index].languages.filter((_, i) => !selectedIndices.includes(i));
                drafts[index].languages = updated;
                await AsyncStorage.setItem("resume_drafts", JSON.stringify(drafts));
                setLanguages(updated);
                setSelected({});
                setDeleting(false);
              }
            },
          },
        ]
      );
    } else {
      setDeleting(true);
    }
  };

  const toggleCheckbox = (index) => {
    setSelected((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleAddLanguage = () => {
    navigation.navigate("AddLanguage", { draftId });
  };

  const handleEditLanguage = (index) => {
    if (!deleting) {
      navigation.navigate("AddLanguage", { draftId, index });
    }
  };

  const handleSave = async () => {
    const saved = await AsyncStorage.getItem("resume_drafts");
    const drafts = saved ? JSON.parse(saved) : [];
    const index = drafts.findIndex((d) => d.id === draftId);

    if (index !== -1) {
      drafts[index].languages = languages;
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
      const currentIndex = enabledSections.indexOf("languages");
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
      const onBackPress = async () => {
        const saved = await AsyncStorage.getItem("resume_drafts");
        const drafts = saved ? JSON.parse(saved) : [];
        const draft = drafts.find((d) => d.id === draftId);
        const sections = draft?.sections || {};
  
        const sectionOrder = ["awards", "volunteer", "languages", "references", "custom"];
        const screenMap = {
          awards: "Awards",
          volunteer: "Volunteer",
          languages: "Languages",
          references: "References",
          custom: "CustomSection",
        };
  
        const enabled = sectionOrder.filter((key) => sections[key]);
        const currentIndex = enabled.indexOf("languages");  
        const prevKey = enabled[currentIndex - 1];
  
        if (prevKey) {
          navigation.navigate(screenMap[prevKey], { draftId });
        } else {
          navigation.navigate("AddSection", { draftId }); 
        }
  
        return true;
      };
  
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [navigation, draftId])
  );
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Languages</Text>
        <TouchableOpacity onPress={() => navigation.navigate("ResumeBuilder", { draftId })}>
          <Text style={styles.backToResume}>Back to Resume</Text>
        </TouchableOpacity>
      </View>

      {languages.map((lang, index) => (
        <View key={index} style={styles.row}>
          {deleting && (
            <CheckBox
              value={!!selected[index]}
              onValueChange={() => toggleCheckbox(index)}
              style={styles.checkbox}
            />
          )}
          <TouchableOpacity
            style={styles.itemButton}
            onPress={() => handleEditLanguage(index)}
          >
            <Text style={styles.buttonText}>{lang.language}</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={handleAddLanguage}>
        <Text style={styles.buttonText}>+ Add Language</Text>
      </TouchableOpacity>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save & Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.deleteButton, deleting && styles.cancelDeleteButton]}
          onPress={toggleDeleteMode}
        >
          <Text style={styles.buttonText}>
            {deleting ? "Confirm/Delete" : "Delete"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkbox: {
    marginRight: 10,
  },
  itemButton: {
    backgroundColor: "#ccc",
    flex: 1,
    padding: 15,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: "#213E64",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    gap: 10,
  },
  saveButton: {
    backgroundColor: "#649A47",
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#B22222",
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelDeleteButton: {
    backgroundColor: "#999",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
