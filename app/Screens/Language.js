import * as React from "react";
import { View, Text, TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image, } from "react-native";
  import Icon from "react-native-vector-icons/FontAwesome";

export default function Settings({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source= {require("./DWA-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>Language</Text>
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="search" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="bars" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Settings List */}
      <ScrollView style={styles.settingsList}>
      <Text style={styles.header2}>
        The DWA app uses the same language that is currently set on your device
      </Text>

      {/* Important to know Section */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Important to know:</Text>
        <Text style={styles.infoText}>
          You can change the preferred language for an app only if more than one language is
          installed on your device.
        </Text>
      </View>

      {/* Steps to set preferred language */}
      <Text style={styles.subHeader}>To set your preferred language:</Text>
      <View style={styles.stepContainer}>
        <Text style={styles.step}>
          1. <Text style={styles.boldText}>Open the Settings</Text> app on your device.
        </Text>
        <Text style={styles.step}>
          2. Scroll down and tap <Text style={styles.boldText}>Apps</Text>.
        </Text>
        <Text style={styles.step}>
          3. Find <Text style={styles.boldText}>DWA</Text> and tap it.
        </Text>

        {/* Notice about different device layouts */}
        <View style={styles.noticeBox}>
          <Text style={styles.noticeText}>
            <Text style={styles.italicText}>If your device has a different menu layout, </Text>
            you can search for <Text style={styles.boldText}>DWA</Text> in the{" "}
            <Text style={styles.boldText}>Settings</Text> app to access it.
          </Text>
        </View>

        <Text style={styles.step}>
          4. Under <Text style={styles.boldText}>Preferred Language</Text>, tap{" "}
          <Text style={styles.boldText}>Language</Text>.
        </Text>
        <Text style={styles.step}>
          5. Select your preferred language from the list. The change is saved automatically.
        </Text>
      </View>

      {/* Description about content */}
      <Text style={styles.description}>
        All DWA-generated content, such as page titles and menus, will display in the
        language you select. Member-generated content, such as posts, articles, group discussions,
        and recommendations will display in the language in which it was written. You can choose to
        translate, if needed.
      </Text>
       
      </ScrollView>
      </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  logo: {
    width: 120,
    height: 40,
  },
  headerTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 10,
  },
  iconsContainer: {
    flexDirection: "row",
  },
  iconButton: {
    marginHorizontal: 10,
  },
  settingsList: {
    marginTop: 10,
    padding: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    justifyContent: "space-between",
  },
  icon: {
    marginRight: 15,
  },
  itemText: {
    fontSize: 18,
    color: "#000",
  },
  bottomNav: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
  },
  activeNavItem: {
    borderTopWidth: 3,
    borderTopColor: "red",
  },
  navText: {
    fontSize: 12,
    marginTop: 5,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // Text Styles
  header2: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222222",
    marginBottom: 15,
  },
  infoTitle: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#222222",
  },
  infoText: {
    fontSize: 14,
    color: "#4F4F4F",
  },
  subHeader: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222222",
    marginBottom: 10,
  },
  stepContainer: {
    marginBottom: 20,
  },
  step: {
    fontSize: 14,
    color: "#4F4F4F",
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "bold",
    color: "#222222",
  },
  noticeBox: {
    backgroundColor: "#F4F6F9",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  noticeText: {
    fontSize: 14,
    color: "#4F4F4F",
  },
  italicText: {
    fontStyle: "italic",
  },
  description: {
    fontSize: 14,
    color: "#4F4F4F",
    lineHeight: 22,
    marginBottom: 30,
  },
  backButton: {
    backgroundColor: "#213E64",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});


