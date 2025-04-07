import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  BackHandler,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CheckBox from "expo-checkbox";
import { useFocusEffect } from "@react-navigation/native";

export default function ResumeBuilder({ navigation }) {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    const loadDrafts = async () => {
      const saved = await AsyncStorage.getItem("resume_drafts");
      const parsed = saved ? JSON.parse(saved) : [];
      setDrafts(parsed);
      setLoading(false);
      setSelected({});
    };

    const unsubscribe = navigation.addListener("focus", loadDrafts);
    return unsubscribe;
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("Homepage");
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [navigation])
  );

  const startNewDraft = async () => {
    const newId = Date.now().toString();
    const newDraft = {
      id: newId,
      personalDetails: {},
      summary: "",
    };

    const updatedDrafts = [...drafts, newDraft];
    await AsyncStorage.setItem("resume_drafts", JSON.stringify(updatedDrafts));
    navigation.navigate("PersonalDetails", { draftId: newId });
  };

  const resumeDraft = (draftId) => {
    const draft = drafts.find((d) => d.id === draftId);
    if (draft?.personalDetails?.firstName) {
      navigation.navigate("Templates", { draftId });
    } else {
      navigation.navigate("PersonalDetails", { draftId });
    }
  };
  const handleDeleteToggle = () => {
    if (deleting) {
      const selectedIds = Object.keys(selected).filter((id) => selected[id]);
  
      if (selectedIds.length === 0) {
        setDeleting(false);
        return;
      }
  
      Alert.alert(
        "Confirm Deletion",
        "Are you sure you want to delete the selected resumes?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Yes, Delete",
            onPress: async () => {
              const remaining = drafts.filter((d) => !selectedIds.includes(d.id));
              await AsyncStorage.setItem("resume_drafts", JSON.stringify(remaining));
              setDrafts(remaining);
              setSelected({});
              setDeleting(false);
            },
            style: "destructive",
          },
        ]
      );
    } else {
      setDeleting(true);
    }
  };

  const toggleCheckbox = (id) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) return <ActivityIndicator size="large" color="#213E64" />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Resume</Text>

      {drafts.map((draft, index) => {
        const headline = draft.personalDetails?.headline?.trim();
        const buttonLabel = headline ? headline : `Draft ${index + 1}`;

        return (
          <View key={draft.id} style={styles.row}>
            {deleting && (
              <CheckBox
                value={!!selected[draft.id]}
                onValueChange={() => toggleCheckbox(draft.id)}
                style={styles.checkbox}
              />
            )}
            <TouchableOpacity
              style={[
                styles.resumeButton,
                headline && styles.greenButton,
                deleting && styles.shrinkButton,
              ]}
              onPress={() => resumeDraft(draft.id)}
            >
              <Text style={styles.buttonText}>{buttonLabel}</Text>
            </TouchableOpacity>
          </View>
        );
      })}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.newResumeButton} onPress={startNewDraft}>
          <Text style={styles.buttonText}>+ New Resume</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.deleteButton,
            deleting ? styles.cancelDeleteButton : null,
          ]}
          onPress={handleDeleteToggle}
        >
          <Text style={styles.buttonText}>
            {deleting ? "Confirm/Delete" : "Delete Resume"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#213E64",
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkbox: {
    marginRight: 10,
  },
  resumeButton: {
    backgroundColor: "#213E64",
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  greenButton: {
    backgroundColor: "#649A47",
  },
  shrinkButton: {
    paddingHorizontal: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 20,
  },
  newResumeButton: {
    backgroundColor: "#649A47",
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: "#D9534F",
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
  },
  cancelDeleteButton: {
    backgroundColor: "#999",
  },
});
