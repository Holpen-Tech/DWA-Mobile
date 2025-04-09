import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
  BackHandler,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";

export default function AddSection() {
  const navigation = useNavigation();
  const route = useRoute();
  const { draftId } = route.params;

  const [sections, setSections] = useState({
    awards: false,
    volunteer: false,
    languages: false,
    references: false,
    custom: false,
  });

  useEffect(() => {
    const loadSections = async () => {
      const saved = await AsyncStorage.getItem("resume_drafts");
      const drafts = saved ? JSON.parse(saved) : [];
      const current = drafts.find((d) => d.id === draftId);
      if (current?.sections) {
        setSections(current.sections);
      }
    };

    loadSections();
  }, [draftId]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("Education", { draftId });
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  const toggleSection = async (key) => {
    const isCurrentlyOn = sections[key];

    const saved = await AsyncStorage.getItem("resume_drafts");
    const drafts = saved ? JSON.parse(saved) : [];
    const index = drafts.findIndex((d) => d.id === draftId);
    const currentDraft = drafts[index];

    if (index === -1) return;

    if (isCurrentlyOn) {
      if (currentDraft[key] && currentDraft[key].length > 0) {
        Alert.alert(
          "Remove Section?",
          `You have added data in the "${key}" section. Are you sure you want to remove it? This will permanently delete all related entries.`,
          [
            {
              text: "No",
              onPress: () => {}, 
              style: "cancel",
            },
            {
              text: "Yes",
              onPress: async () => {
                delete drafts[index][key];
                drafts[index].sections = { ...sections, [key]: false };
                await AsyncStorage.setItem("resume_drafts", JSON.stringify(drafts));
                setSections((prev) => ({ ...prev, [key]: false }));
              },
              style: "destructive",
            },
          ]
        );
      } else {
        drafts[index].sections = { ...sections, [key]: false };
        await AsyncStorage.setItem("resume_drafts", JSON.stringify(drafts));
        setSections((prev) => ({ ...prev, [key]: false }));
      }
    } else {
      drafts[index].sections = { ...sections, [key]: true };
      await AsyncStorage.setItem("resume_drafts", JSON.stringify(drafts));
      setSections((prev) => ({ ...prev, [key]: true }));
    }
  };

  const handleSave = async () => {
    const saved = await AsyncStorage.getItem("resume_drafts");
    const drafts = saved ? JSON.parse(saved) : [];
    const index = drafts.findIndex((d) => d.id === draftId);

    if (index !== -1) {
      drafts[index].sections = sections;
      await AsyncStorage.setItem("resume_drafts", JSON.stringify(drafts));

      const sectionOrder = [
        { key: "awards", screen: "Awards" },
        { key: "volunteer", screen: "Volunteer" },
        { key: "languages", screen: "Languages" },
        { key: "references", screen: "References" },
        { key: "custom", screen: "CustomSection" },
      ];

      const next = sectionOrder.find(({ key }) => sections[key]);

      if (next) {
        navigation.navigate(next.screen, { draftId });
      } else {
        navigation.navigate("Templates", { draftId });
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Section</Text>

      {[
        ["Awards", "awards"],
        ["Volunteer Experience", "volunteer"],
        ["Languages", "languages"],
        ["References", "references"],
        ["Custom Section", "custom"],
      ].map(([label, key]) => (
        <View style={styles.optionRow} key={key}>
          <Text style={styles.optionLabel}>{label}</Text>
          <Switch
            value={sections[key]}
            onValueChange={() => toggleSection(key)}
          />
        </View>
      ))}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save & Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: "#fff",
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#213E64",
    textAlign: "center",
    marginBottom: 30,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  optionLabel: {
    fontSize: 18,
    color: "#213E64",
    fontWeight: "500",
  },
  saveButton: {
    backgroundColor: "#649A47",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
