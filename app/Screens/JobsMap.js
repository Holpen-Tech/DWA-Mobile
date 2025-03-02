import { useSortedScreens } from "expo-router/build/useScreens";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function JobMap({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={require("./DWA-logo.png")} style={styles.logo} />
          <Text style={styles.headerTitle}>Job Map</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Icon name="search" size={20} color="#000" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="bars" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Map Section */}
      <View style={styles.mapContainer}>
        <Image
          source={require("./Resumebuilderimage.png")}
          style={styles.map}
        />
      </View>

      {/* Filters Section */}
      <ScrollView style={styles.filters}>
        <View style={styles.filterRow}>
          <Text style={styles.filterLabel}>Job Markers</Text>
          <Switch value={true} />
        </View>

        <View style={styles.filterSearch}>
          <TextInput style={styles.searchInput} placeholder="Search" />
          <TouchableOpacity>
            <Icon name="search" size={18} color="#000" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.filterItem}>
          <Text style={styles.filterText}>Quick Find: All Tags</Text>
          <Icon name="chevron-down" size={16} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterItem}>
          <Text style={styles.filterText}>
            Show All Occupational Categories
          </Text>
          <Icon name="chevron-down" size={16} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterItem}>
          <Text style={styles.filterText}>Show All TEER Categories</Text>
          <Icon name="chevron-down" size={16} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterItem}>
          <Text style={styles.filterText}>Show All Job Types</Text>
          <Icon name="chevron-down" size={16} color="#000" />
        </TouchableOpacity>

        <View style={styles.optionalItems}>
          <TouchableOpacity>
            <Icon name="bicycle" size={18} color="#000" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.filterText}>Cycle Tour Routes</Text>
          <Switch value={true} />
        </View>

        <View style={styles.optionalItems}>
          <TouchableOpacity>
            <Icon name="bus" size={18} color="#000" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.filterText}>Durham Region Transit Routes</Text>
          <Switch value={true} />
        </View>

        <View style={styles.optionalItems}>
          <TouchableOpacity>
            <Icon name="wrench" size={18} color="#000" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.filterText}>Apprenticeship Training Sites</Text>
          <Switch value={true} />
        </View>

        <View style={styles.optionalItems}>
          <TouchableOpacity>
            <Icon name="child" size={18} color="#000" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.filterText}>Child Care Centres</Text>
          <Switch value={true} />
        </View>

        <View style={styles.optionalItems}>
          <TouchableOpacity>
            <Icon name="car" size={18} color="#000" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.filterText}>DriveTest Centres</Text>
          <Switch value={true} />
        </View>

        <View style={styles.optionalItems}>
          <TouchableOpacity>
            <Icon name="building" size={18} color="#000" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.filterText}>Education - Elementary Schools</Text>
          <Switch value={true} />
        </View>

        <View style={styles.optionalItems}>
          <TouchableOpacity>
            <Icon name="school" size={18} color="#000" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.filterText}>Education - Secondary Schools</Text>
          <Switch value={true} />
        </View>

        <View style={styles.optionalItems}>
          <TouchableOpacity>
            <Icon
              name="graduation-cap"
              size={18}
              color="#000"
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.filterText}>Education - Post Secondary</Text>
          <Switch value={true} />
        </View>

        <View style={styles.optionalItems}>
          <TouchableOpacity>
            <Icon name="building" size={18} color="#000" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.filterText}>Employment Agencies (Private)</Text>
          <Switch value={true} />
        </View>

        <View style={styles.optionalItems}>
          <TouchableOpacity>
            <Icon name="building" size={18} color="#000" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.filterText}>Employment Servicies</Text>
          <Switch value={true} />
        </View>

        <View style={styles.optionalItems}>
          <TouchableOpacity>
            <Icon name="comments" size={18} color="#000" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.filterText}>Language Training</Text>
          <Switch value={true} />
        </View>

        <View style={styles.optionalItems}>
          <TouchableOpacity>
            <Icon name="book" size={18} color="#000" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.filterText}>Literacy & Basic Skills</Text>
          <Switch value={true} />
        </View>

        <View style={styles.optionalItems}>
          <TouchableOpacity>
            <Icon name="user" size={18} color="#000" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.filterText}>ODSP Employment Supports</Text>
          <Switch value={true} />
        </View>

        <View style={styles.optionalItems}>
          <TouchableOpacity>
            <Icon name="user" size={18} color="#000" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.filterText}>
            Ontario Disability Support Program
          </Text>
          <Switch value={true} />
        </View>

        <View style={styles.optionalItems}>
          <TouchableOpacity>
            <Icon name="profile" size={18} color="#000" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.filterText}>
            Ontario MLTSD Apprenticeship Office
          </Text>
          <Switch value={true} />
        </View>

        <View style={styles.optionalItems}>
          <TouchableOpacity>
            <Icon name="user" size={18} color="#000" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.filterText}>Ontario Works</Text>
          <Switch value={true} />
        </View>

        <View style={styles.optionalItems}>
          <TouchableOpacity>
            <Icon name="profile" size={18} color="#000" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.filterText}>Service Canada</Text>
          <Switch value={true} />
        </View>

        <View style={styles.optionalItems}>
          <TouchableOpacity>
            <Icon
              name="canadian-maple-leaf"
              size={18}
              color="#000"
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.filterText}>Service Ontario</Text>
          <Switch value={true} />
        </View>
      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.navButton}>
          <Icon name="home" size={20} color="#000" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Icon name="bookmark" size={20} color="#000" />
          <Text style={styles.navText}>My Jobs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Icon name="bell" size={20} color="#000" />
          <Text style={styles.navText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Icon name="cog" size={20} color="#000" />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  logoContainer: { flexDirection: "row", alignItems: "center" },
  logo: { width: 40, height: 40, marginRight: 10 },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#000" },
  headerIcons: { flexDirection: "row", gap: 15 },
  icon: { marginLeft: 10 },

  mapContainer: { flex: 2, margin: 10, borderRadius: 10, overflow: "hidden" },
  map: { width: "100%", height: "100%" },

  filters: { flex: 3, padding: 10 },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  filterLabel: { fontSize: 16, color: "#000" },
  filterSearch: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchInput: { flex: 1, height: 40 },

  filterItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  filterText: { fontSize: 16, color: "#000" },

  optionalItems: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  navButton: { alignItems: "center" },
  navText: { fontSize: 12, color: "#000" },
});
