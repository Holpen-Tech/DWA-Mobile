import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Settings({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("./DWA-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>Settings</Text>
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
        <TouchableOpacity style={styles.item}>
          <Icon name="user" size={24} color="#000" style={styles.icon} />
          <Text style={styles.itemText}>Account preference</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Icon name="lock" size={24} color="#000" style={styles.icon} />
          <Text style={styles.itemText}>Security</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Icon name="shield" size={24} color="#000" style={styles.icon} />
          <Text style={styles.itemText}>Privacy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Icon name="bell" size={24} color="#000" style={styles.icon} />
          <Text style={styles.itemText}>Notification Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Icon name="globe" size={24} color="#000" style={styles.icon} />
          <Text style={styles.itemText}>Language</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Icon
            name="question-circle"
            size={24}
            color="#000"
            style={styles.icon}
          />
          <Text style={styles.itemText}>Help Center</Text>
        </TouchableOpacity>
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
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
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
});
