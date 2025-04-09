import React, { useState, useEffect } from "react";
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
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";

export default function Summary() {
  const navigation = useNavigation();
  const route = useRoute();
  const { draftId } = route.params;
  const [summary, setSummary] = useState("");

  useEffect(() => {
    const loadDraft = async () => {
      const saved = await AsyncStorage.getItem("resume_drafts");
      const drafts = saved ? JSON.parse(saved) : [];
      const thisDraft = drafts.find((d) => d.id === draftId);
      if (thisDraft && thisDraft.summary) {
        setSummary(thisDraft.summary);
      }
    };
    loadDraft();
  }, [draftId]);

  const handleContinue = async () => {
    if (!summary.trim()) {
      Alert.alert("Missing Info", "Please enter your professional summary.");
      return;
    }

    const saved = await AsyncStorage.getItem("resume_drafts");
    const drafts = saved ? JSON.parse(saved) : [];
    const index = drafts.findIndex((d) => d.id === draftId);
    if (index !== -1) {
      drafts[index].summary = summary;
    }

    await AsyncStorage.setItem("resume_drafts", JSON.stringify(drafts));
    navigation.navigate("Experience", { draftId });
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("PersonalDetails", { draftId });
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [navigation])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Summary</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("ResumeBuilder", { draftId })}
        >
          <Text style={styles.backToResume}>Back to Resume</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Professional Summary</Text>
      <TextInput
        style={styles.input}
        value={summary}
        onChangeText={setSummary}
        placeholder="Write a short summary of your most important skills or accomplishments"
        multiline
        numberOfLines={6}
        textAlignVertical="top"
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.saveButton} onPress={handleContinue}>
          <Text style={styles.buttonText}>Save & Continue</Text>
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
    flexGrow: 1,
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
    marginBottom: 10,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 6,
    fontSize: 16,
    height: 140,
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
