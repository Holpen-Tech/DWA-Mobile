import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  BackHandler,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";

export default function Skills() {
  const navigation = useNavigation();
  const route = useRoute();
  const { draftId } = route.params;

  const [input, setInput] = useState("");
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const loadSkills = async () => {
      const saved = await AsyncStorage.getItem("resume_drafts");
      const drafts = saved ? JSON.parse(saved) : [];
      const draft = drafts.find((d) => d.id === draftId);

      if (draft?.skills && Array.isArray(draft.skills)) {
        setSkills(draft.skills);
      }
    };

    loadSkills();
  }, [draftId]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("Experience", { draftId });
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [navigation, draftId])
  );

  const handleAddSkill = () => {
    if (input.trim() && !skills.includes(input.trim())) {
      setSkills((prev) => [...prev, input.trim()]);
      setInput("");
    }
  };

  const handleKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === "Enter") {
      handleAddSkill();
    }
  };

  const removeSkill = (index) => {
    const updated = [...skills];
    updated.splice(index, 1);
    setSkills(updated);
  };

  const handleSave = async () => {
    const saved = await AsyncStorage.getItem("resume_drafts");
    const drafts = saved ? JSON.parse(saved) : [];
    const index = drafts.findIndex((d) => d.id === draftId);

    if (index !== -1) {
      drafts[index].skills = skills;
      await AsyncStorage.setItem("resume_drafts", JSON.stringify(drafts));
    }

    navigation.navigate("Education", { draftId });
    Keyboard.dismiss();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Skills</Text>
        <TouchableOpacity
          onPress={async () => {
            const saved = await AsyncStorage.getItem("resume_drafts");
            const drafts = saved ? JSON.parse(saved) : [];
            const index = drafts.findIndex((d) => d.id === draftId);
            if (index !== -1) {
              drafts[index].skills = skills;
              await AsyncStorage.setItem("resume_drafts", JSON.stringify(drafts));
            }
            navigation.navigate("ResumeBuilder", { draftId });
          }}
        >
          <Text style={styles.resumeLink}>Back to Resume</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Type a skill and press Enter"
        value={input}
        onChangeText={setInput}
        onKeyPress={handleKeyPress}
      />

      <View style={styles.tagsContainer}>
        {skills.map((skill, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{skill}</Text>
            <TouchableOpacity onPress={() => removeSkill(index)}>
              <Text style={styles.remove}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

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
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 6,
    fontSize: 16,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
  },
  tag: {
    backgroundColor: "#213E64",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 5,
  },
  tagText: {
    color: "#fff",
    fontWeight: "bold",
    marginRight: 8,
  },
  remove: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
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
