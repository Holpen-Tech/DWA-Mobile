import { View, Text, StyleSheet, Container } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import Homepage from "./Screens/Homepage";
import JobBoard from "./Screens/JobBoard";
import survey from "./Screens/survey";
import onboardingFour from "./Screens/onboardingFour";
import onboardingThree from "./Screens/onboardingThree";
import onboardingOne from "./Screens/onboardingOne";
import onboardingTwo from "./Screens/onboardingTwo";
import JobMap from "./Screens/JobsMap";
import SavedJobs from "./Screens/savedJobs";
import MainContainer from "./Screens/MainContainer";
import Settings from "./Screens/Settings";
import Notifications from "./Screens/notifications";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* Show Onboarding/Login/Signup first */}
          <Stack.Screen name="onboardingOne" component={onboardingOne} />
          <Stack.Screen name="onboardingTwo" component={onboardingTwo} />
          <Stack.Screen name="onboardingThree" component={onboardingThree} />
          <Stack.Screen name="survey" component={survey} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />

          {/* Main App with Bottom Tab Navigation */}
          <Stack.Screen name="MainContainer" component={MainContainer} />
          <Stack.Screen name="Homepage" component={Homepage} />
          <Stack.Screen name="JobBoard" component={JobBoard} />
          <Stack.Screen name="JobMap" component={JobMap} />
          <Stack.Screen name="SavedJobs" component={SavedJobs} />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
