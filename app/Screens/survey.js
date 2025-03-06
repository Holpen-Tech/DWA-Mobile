import React from "react";
import styled from "styled-components/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const Logo = styled.Image`
  width: 80px; /* Adjust the width to your desired size */
  height: 80px; /* Adjust the height to your desired size */
  margin-bottom: 20px;
`;

const SurveyPage = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Logo Section */}
      <Logo source={require("./DWA-logo.png")} />

      {/* Title Section */}
      <Text style={styles.title}>Durham Yearly Workforce Survey</Text>

      {/* Subtitle Section */}
      <Text style={styles.subtitles}>Have your say</Text>

      {/* Buttons Section */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.buttonPrimary}>
          <Text style={styles.buttonTextPrimary}>Take the 2024 Survey</Text>
        </TouchableOpacity>
        <Text style={styles.subtitle}>Join DWA</Text>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate("Login")} // Navigate to Login screen
        >
          <Text style={styles.buttonTextSecondary}>Get back in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate("Signup")} // Navigate to Signup screen
        >
          <Text style={styles.buttonTextSecondary}>Sign up now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "left",
    color: "#0077C2",
    marginTop: -40,
    fontStyle: "italic",
  },
  subtitles: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: -210,
    color: "#0077C2",
    marginTop: -60,
    marginBottom: -60,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "left",
    fontWeight: "bold",
    color: "#0077C2",
    marginVertical: 40,
    marginBottom: 20,
  },
  buttonsContainer: {
    width: "85%",
  },
  buttonPrimary: {
    backgroundColor: "#649A47",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonTextPrimary: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonSecondary: {
    borderColor: "#4CAF50",
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonTextSecondary: {
    color: "#4CAF50",
    fontSize: 16,
    fontWeight: "bold",
  },
  paginationContainer: {
    marginBottom: 20,
  },
  pagination: {
    fontSize: 16,
    color: "#000000",
  },
});

export default SurveyPage;
