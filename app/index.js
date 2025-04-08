import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useContext } from "react";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { UserProvider, UserContext } from "./contexts/UserContext";

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
import CareerExplorer from "./Screens/CareerExplorer";
import ResumeBuilder from "./Screens/ResumeBuilder";
import PersonalDetails from "./Screens/PersonalDetails";
import Summary from "./Screens/Summary";
import Experience from "./Screens/Experience";
import AddPosition from "./Screens/AddPosition";
import AddResponsibilities from "./Screens/AddResponsibilities";
import Skills from "./Screens/Skills";
import Education from "./Screens/Education";
import AddSchool from "./Screens/AddSchool";
import Courses from "./Screens/Courses";
import AddSection from "./Screens/AddSection";
import Templates from "./Screens/Templates";
import PreviewResume from "./Screens/PreviewResume";
import Awards from "./Screens/Awards";
import AddAward from "./Screens/AddAward";
import VolunteerExp from "./Screens/VolunteerExp";
import AddVPosition from "./Screens/AddVPosition";
import AddVResponsibilities from "./Screens/AddVResponsibilities";
import Languages from "./Screens/Languages";
import AddLanguage from "./Screens/AddLanguage";
import References from "./Screens/References";
import AddReference from "./Screens/AddReference";
import CustomSection from "./Screens/CustomSection";

const Stack = createStackNavigator();

const AppContent = () => {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(
            "http://192.168.2.206:3000/api/auth/validate-token",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (response.data.valid) {
            setUser(response.data.user); // Store the user data
          } else {
            await AsyncStorage.removeItem("token");
            setUser(null);
          }
        } catch (error) {
          console.log("Token validation failed", error);
          await AsyncStorage.removeItem("token");
          setUser(null);
        }
      }
    };

    checkToken();
  }, []);

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
          <Stack.Screen name="CareerExplorer" component={CareerExplorer} />
          <Stack.Screen name="ResumeBuilder" component={ResumeBuilder} />
          <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
          <Stack.Screen name="Summary" component={Summary} />
          <Stack.Screen name="Experience" component={Experience} />
          <Stack.Screen name="AddPosition" component={AddPosition} />
          <Stack.Screen name="AddResponsibilities" component={AddResponsibilities} />
          <Stack.Screen name="Skills" component={Skills} />
          <Stack.Screen name="Education" component={Education} />
          <Stack.Screen name="AddSchool" component={AddSchool} />
          <Stack.Screen name="Courses" component={Courses} />
          <Stack.Screen name="AddSection" component={AddSection} />
          <Stack.Screen name="Templates" component={Templates} />
          <Stack.Screen name="PreviewResume" component={PreviewResume} />
          <Stack.Screen name="Awards" component={Awards} />
          <Stack.Screen name="AddAward" component={AddAward} />
          <Stack.Screen name="Volunteer" component={VolunteerExp} />
          <Stack.Screen name="AddVPosition" component={AddVPosition} />
          <Stack.Screen name="AddVResponsibilities" component={AddVResponsibilities} />
          <Stack.Screen name="Languages" component={Languages} />
          <Stack.Screen name="AddLanguage" component={AddLanguage} />
          <Stack.Screen name="References" component={References} />
          <Stack.Screen name="AddReference" component={AddReference} />
          <Stack.Screen name="CustomSection" component={CustomSection} />

        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
};

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
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
