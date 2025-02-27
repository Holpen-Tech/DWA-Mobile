import { View, Text, StyleSheet, Container } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
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
const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // This hides the header for all screens
      }}
    >
      <Stack.Screen name="onboardingOne" component={onboardingOne} />
      <Stack.Screen name="onboardingTwo" component={onboardingTwo} />
      <Stack.Screen name="onboardingThree" component={onboardingThree} />

      <Stack.Screen name="survey" component={survey} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Homepage" component={Homepage} />
      <Stack.Screen name="JobBoard" component={JobBoard} />
      <Stack.Screen name="JobMap" component={JobMap} />
    </Stack.Navigator>
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
