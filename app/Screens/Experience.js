import React, { useEffect, useState, useLayoutEffect } from "react";
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
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import CheckBox from "expo-checkbox";

export default function Experience() {
  const navigation = useNavigation();
  const route = useRoute();
  const { draftId } = route.params;

  const [positions, setPositions] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    const loadExperience = async () => {
      const saved = await AsyncStorage.getItem("resume_drafts");
      const drafts = saved ? JSON.parse(saved) : [];
      const current = drafts.find((d) => d.id === draftId);
      if (current?.experience) {
        setPositions(current.experience);
      }
    };
    loadExperience();
  }, [draftId]);

  const handleAddPosition = () => {
    navigation.navigate("AddPosition", { draftId });
  };

  const handleEditPosition = (index) => {
    if (!deleting) {
      navigation.navigate("AddPosition", { draftId, positionIndex: index });
    }
  };

  const handleContinue = () => {
    navigation.navigate("Skills", { draftId });
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
        "Are you sure you want to delete the selected experience entries?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Yes, Delete",
            style: "destructive",
            onPress: async () => {
              const saved = await AsyncStorage.getItem("resume_drafts");
              const drafts = saved ? JSON.parse(saved) : [];
              const draftIndex = drafts.findIndex((d) => d.id === draftId);

              if (draftIndex !== -1) {
                const updated = drafts[draftIndex].experience.filter(
                  (_, i) => !selectedIndices.includes(i)
                );
                drafts[draftIndex].experience = updated;
                await AsyncStorage.setItem("resume_drafts", JSON.stringify(drafts));
                setPositions(updated);
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
        navigation.navigate("Summary", { draftId });
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [navigation])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("ResumeBuilder")}
          style={{ marginRight: 15 }}
        >
          <Text style={{ color: "#213E64", fontWeight: "bold" }}>
            Back to Resume
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Experience</Text>

      {positions.map((position, index) => {
        const title = position.jobTitle || "Untitled";
        const start = position.startYear || "Unknown";
        const end = position.current ? "Current" : position.endYear || "Unknown";

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
              style={styles.positionButton}
              onPress={() => handleEditPosition(index)}
            >
              <Text style={styles.buttonText}>
                {title} | {start} - {end}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddPosition}>
          <Text style={styles.buttonText}>+ Add Position</Text>
        </TouchableOpacity>
      </View>

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
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#213E64",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkbox: {
    marginRight: 10,
  },
  positionButton: {
    backgroundColor: "#ccc",
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: "#213E64",
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#649A47",
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#B22222",
    flex: 1,
    paddingVertical: 15,
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
