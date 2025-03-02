import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Import your screens
import Homepage from "./Homepage";
import SavedJobs from "./savedJobs";
import Notifications from "./notifications";
import Settings from "./Settings";

// Screen names
const homeName = "Home";
const savedJobsName = "Saved Jobs";
const notificationsName = "Notifications";
const settingsName = "Settings";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === homeName) {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === savedJobsName) {
            iconName = focused ? "bookmark" : "bookmark-outline";
          } else if (route.name === notificationsName) {
            iconName = focused ? "notifications" : "notifications-outline";
          } else if (route.name === settingsName) {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#213E64",
        tabBarInactiveTintColor: "grey",
        tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
        tabBarStyle: { padding: 10, height: 50 },
        headerShown: false,
      })}
    >
      <Tab.Screen name={homeName} component={Homepage} />
      <Tab.Screen name={savedJobsName} component={SavedJobs} />
      <Tab.Screen name={notificationsName} component={Notifications} />
      <Tab.Screen name={settingsName} component={Settings} />
    </Tab.Navigator>
  );
}

export default MainContainer;
