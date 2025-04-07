import React, { useState, useEffect } from "react";
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
import { useNavigation, useFocusEffect, useRoute } from "@react-navigation/native";
import CheckBox from "expo-checkbox";

export default function Education() {
  const navigation = useNavigation();
  const route = useRoute();
  const { draftId } = route.params;
  const [schools, setSchools] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    const loadEducation = async () => {
      const saved = await AsyncStorage.getItem("resume_drafts");
      const drafts = saved ? JSON.parse(saved) : [];
      const current = drafts.find((d) => d.id === draftId);
      if (current?.education) {
        setSchools(current.education);
      }
    };

    loadEducation();
  }, [draftId]);

  const handleContinue = () => {
    navigation.navigate("AddSection", { draftId });
  };

  const handleAddSchool = () => {
    navigation.navigate("AddSchool", { draftId });
  };

  const handleEditSchool = (index) => {
    if (!deleting) {
      navigation.navigate("AddSchool", { draftId, index });
    }
  };

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
                const updated = drafts[index].education.filter(
                  (_, i) => !selectedIndices.includes(i)
                );
                drafts[index].education = updated;
                await AsyncStorage.setItem("resume_drafts", JSON.stringify(drafts));
                setSchools(updated);
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

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("Skills", { draftId });
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
        <Text style={styles.title}>Education</Text>
        <TouchableOpacity onPress={() => navigation.navigate("ResumeBuilder", { draftId })}>
          <Text style={styles.backToResume}>Back to Resume</Text>
        </TouchableOpacity>
      </View>

      {schools.map((school, index) => {
        const name = school.schoolName || "Unnamed School";
        const start = school.startYear || "Unknown";
        const end = school.endYear || (school.current ? "Current" : "Unknown");

        return (
          <View key={index} style={styles.row}>
            {deleting && (
              <CheckBox
                value={!!selected[index]}
                onValueChange={() => toggleCheckbox(index)}
                style={styles.checkbox}
              />
            )}
            <TouchableOpacity
              style={styles.schoolButton}
              onPress={() => handleEditSchool(index)}
            >
              <Text style={styles.buttonText}>
                {name} | {start} - {end}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}

      <TouchableOpacity style={styles.addButton} onPress={handleAddSchool}>
        <Text style={styles.buttonText}>+ Add School</Text>
      </TouchableOpacity>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.saveButton} onPress={handleContinue}>
          <Text style={styles.buttonText}>Save & Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.deleteButton, deleting ? styles.cancelDeleteButton : null]}
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkbox: {
    marginRight: 10,
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
  schoolButton: {
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
