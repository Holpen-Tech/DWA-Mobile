import React, { useState } from "react";
import { View, Text, TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image, Modal,
  Pressable, } from "react-native";
  import Icon from "react-native-vector-icons/FontAwesome";
  import { useNavigation } from "@react-navigation/native"; // Import navigation


export default function Settings({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
    
  
    // Function to handle signout
    const handleSignout = () => {
      setModalVisible(false); // Close the modal
      navigation.replace("Login"); // Redirect to Login.js
    };
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source= {require("./DWA-logo.png")}
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
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("AccountPreferences")}>
          <Icon name="user" size={24} color="#000" style={styles.icon} />
          <Text style={styles.itemText}>Account preference</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}  onPress={() => navigation.navigate("Security")}>
          <Icon name="lock" size={24} color="#000" style={styles.icon} />
          <Text style={styles.itemText}>Security</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Privacy")}>
          <Icon name="shield" size={24} color="#000" style={styles.icon} />
          <Text style={styles.itemText}>Privacy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("NotificationSettings")}>
          <Icon name="bell" size={24} color="#000" style={styles.icon} />
          <Text style={styles.itemText}>Notification Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Language")}>
          <Icon name="globe" size={24} color="#000" style={styles.icon} />
          <Text style={styles.itemText}>Language</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("HelpCenter")}>
          <Icon name="question-circle" size={24} color="#000" style={styles.icon} />
          <Text style={styles.itemText}>Help Center</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => setModalVisible(true)}>
          <Icon name="sign-out" size={24} color="red" style={styles.icon} />
          <Text style={[styles.itemText, { color: 'red' }]}>Signout</Text>
        </TouchableOpacity>

         <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Confirm Signout</Text>
                    <Text style={styles.modalText}>
                      Are you sure you want to sign out?
                    </Text>
        
                    {/* Button Row */}
                    <View style={styles.buttonRow}>
                      <Pressable
                        style={[styles.button, styles.cancelButton]}
                        onPress={() => setModalVisible(false)}
                      >
                        <Text style={styles.cancelText}>No</Text>
                      </Pressable>
        
                      <Pressable
                        style={[styles.button, styles.confirmButton]}
                        onPress={handleSignout}
                      >
                        <Text style={styles.confirmText}>Yes</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Modal>
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

  //Signout pop-up
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#e0e0e0",
  },
  confirmButton: {
    backgroundColor: "#213E64",
  },
  cancelText: {
    color: "#000",
    fontWeight: "bold",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
