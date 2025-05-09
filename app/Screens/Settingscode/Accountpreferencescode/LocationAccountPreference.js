import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
  import { useNavigation } from "@react-navigation/native";


const LocationAccountPreference = () => {
  const [countryRegion, setCountryRegion] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleSave = () => {
    if (!countryRegion.trim() || !city.trim()) {
      Alert.alert("Error", "Country/Region and city are required.");
      return;
    }
    Alert.alert("Success", "Location saved");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo at the top */}
      <Image source={require("./DWA-logo.png")} style={styles.logo} />

      {/* Country/Region Input */}
      <Text style={styles.label}>Country/Region*</Text>
      <TextInput
        style={styles.input}
        placeholder=""
        value={countryRegion}
        onChangeText={setCountryRegion}
      />

      {/* City Input */}
      <Text style={styles.label}>City*</Text>
      <TextInput
        style={styles.input}
        placeholder=""
        value={city}
        onChangeText={setCity}
      />

      {/* Postal code Input */}
      <Text style={styles.label}>Postal code</Text>
      <TextInput
        style={styles.input}
        placeholder=""
        value={postalCode}
        onChangeText={setPostalCode}
      />

      {/* Save Button */}
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
  logo: {
    width: 180,
    height: 40,
    resizeMode: "contain",
    marginBottom: 20,
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: 40,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#000",
  },
  input: {
    width: "85%",
    height: 40,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    width: "85%",
    height: 45,
    backgroundColor: "#1E4FC1",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});

export default LocationAccountPreference;
