<<<<<<< HEAD
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
} from "react-native";
import { Feather } from "@expo/vector-icons";

// Sample notification data
const notificationData = [
  {
    id: "1",
    message:
      "Associate job openings increased by 8% this past week. Explore more career insight",
    time: "2h",
  },
  {
    id: "2",
    message:
      "Associate job openings increased by 8% this past week. Explore more career insight",
    time: "5h",
  },
  {
    id: "3",
    message:
      "Associate job openings increased by 8% this past week. Explore more career insight",
    time: "6h",
  },
  {
    id: "4",
    message:
      "Associate job openings increased by 8% this past week. Explore more career insight",
    time: "12h",
  },
  {
    id: "5",
    message:
      "Associate job openings increased by 8% this past week. Explore more career insight",
    time: "22h",
  },
];

// Render a single notification item
const NotificationItem = ({ item }) => {
  return (
    <View style={styles.notificationItem}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Feather name="user" size={20} color="black" />
        </View>
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationText}>{item.message}</Text>
      </View>
      <View style={styles.notificationMeta}>
        <Text style={styles.timeText}>{item.time}</Text>
        <TouchableOpacity style={styles.moreButton}>
          <Feather name="more-vertical" size={16} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function Notifications({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require("./DWA-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="search" size={22} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="menu" size={22} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Notification List */}
      <FlatList
        data={notificationData}
        renderItem={({ item }) => <NotificationItem item={item} />}
        keyExtractor={(item) => item.id}
        style={styles.notificationList}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom padding to account for your navigation bar */}
      <View style={{ height: 20 }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  logoContainer: {
    width: 40,
    height: 40,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#14304d",
    flex: 1,
    marginLeft: 8,
  },
  headerIcons: {
    flexDirection: "row",
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  notificationList: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  notificationContent: {
    flex: 1,
    paddingRight: 8,
  },
  notificationText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
  },
  notificationMeta: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingLeft: 8,
    width: 50,
  },
  timeText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  moreButton: {
    padding: 4,
  },
});
=======
import * as React from "react";
import { View, Text } from "react-native";

export default function Notifications({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        onPress={() => navigation.navigate("Home")}
        style={{ fontSize: 26, fontWeight: "bold" }}
      >
        Details Screen
      </Text>
    </View>
  );
}
>>>>>>> feature/jobs-map
