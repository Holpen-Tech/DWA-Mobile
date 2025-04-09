import { View, Text, StyleSheet, Animated } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useContext, useState, useRef } from "react";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { UserProvider, UserContext } from "./contexts/UserContext";
import * as SplashScreenExpo from 'expo-splash-screen';

// Import SplashScreen component
import SplashScreen from "./Screens/SplashScreen";

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
import WelcomeScreen from "./Screens/WelcomeScreen"
import sideBar from "./Screens/sideBar";
import UserProfile from "./Screens/UserProfile";

// settings
import Security from "./Screens/Settingscode/Securitycode/Security";
import Privacy from "./Screens/Settingscode/Privacycode/Privacy";
import AccountPreferences from "./Screens/Settingscode/Accountpreferencescode/AccountPreferences";
import NotificationSettings from "./Screens/Settingscode/Notificationsettingscode/NotificationSettings";
import Language from "./Screens/Settingscode/Languagecode/Language";
import HelpCenter from "./Screens/Settingscode/Helpcentercode/HelpCenter";
import Signout from "./Screens/Settingscode/Signoutcode/Signout";

// sub-settings
import NameAccountPreference from "./Screens/Settingscode/Accountpreferencescode/NameAccountPreference";
import LocationAccountPreference from "./Screens/Settingscode/Accountpreferencescode/LocationAccountPreference";
import IndustryAccountPreference from "./Screens/Settingscode/Accountpreferencescode/IndustryAccountPreference";
import EmailSecurity from "./Screens/Settingscode/Securitycode/EmailSecurity";
import PhoneNumberSecurity from "./Screens/Settingscode/Securitycode/PhoneNumberSecurity";
import PasswordSecurity from "./Screens/Settingscode/Securitycode/PasswordSecurity";
import JobAlertNotificationSettings from "./Screens/Settingscode/Notificationsettingscode/JobAlertNotificationSettings";
import SavedJobsNotificationSettings from"./Screens/Settingscode/Notificationsettingscode/SavedJobsNotificationSettings";
import JobRecommNotificationSettings from"./Screens/Settingscode/Notificationsettingscode/JobRecommNotificationSettings";

// resume-builder
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
  const [isAppReady, setIsAppReady] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(
            "http://YOUR_ID_ADDRESS:3000/api/auth/validate-token", // do make sure to include your IP address here
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

  // Handle app fade-in animation when splash screen finishes
  useEffect(() => {
    if (isAppReady) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500, // 0.5 second fade in for the app
        useNativeDriver: true,
      }).start();
    }
  }, [isAppReady, fadeAnim]);

  const handleSplashFinish = () => {
    setIsAppReady(true);
  };

  if (!isAppReady) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <NavigationIndependentTree>
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              cardStyleInterpolator: ({ current }) => ({
                cardStyle: {
                  opacity: current.progress,
                },
              }),
            }}
          >
          {/* Show Onboarding/Login/Signup first */}
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
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

          {/* Sidebar and User Profile */}
          <Stack.Screen name="sideBar" component={sideBar} />
          <Stack.Screen name="UserProfile" component={UserProfile} />

          {/* Settings pages */}
          <Stack.Screen name="Security" component={Security} />
          <Stack.Screen name="Privacy" component={Privacy} />
          <Stack.Screen name="AccountPreferences" component={AccountPreferences} />
          <Stack.Screen name="NotificationSettings" component={NotificationSettings} />
          <Stack.Screen name="Language" component={Language} />
          <Stack.Screen name="HelpCenter" component={HelpCenter} />
          <Stack.Screen name="Signout" component={Signout} />

          {/* Sub-Settings pages */}
          <Stack.Screen name="NameAccountPreference" component={NameAccountPreference} />
          <Stack.Screen name="LocationAccountPreference" component={LocationAccountPreference} />
          <Stack.Screen name="IndustryAccountPreference" component={IndustryAccountPreference} />
          <Stack.Screen name="EmailSecurity" component={EmailSecurity} />
          <Stack.Screen name="PhoneNumberSecurity" component={PhoneNumberSecurity} />
          <Stack.Screen name="PasswordSecurity" component={PasswordSecurity} />
          <Stack.Screen name="JobAlertNotificationSettings" component={JobAlertNotificationSettings} />
          <Stack.Screen name="SavedJobsNotificationSettings" component={SavedJobsNotificationSettings} />
          <Stack.Screen name="JobRecommNotificationSettings" component={JobRecommNotificationSettings} />

          {/* Resume Builder pages */}
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
      </Animated.View>
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