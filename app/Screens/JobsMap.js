//import { useSortedScreens } from "expo-router/build/useScreens";
import Constants from 'expo-constants';
import React, { useState, useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MapboxGL from "@rnmapbox/maps";            // ----jobs map feature

// Get access token from app.json
const MAPBOX_ACCESS_TOKEN = Constants.expoConfig.extra.MAPBOX_ACCESS_TOKEN;
// Set the token for Mapbox
MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN); //---jobs map feature

export default function JobMap({ navigation }) {
  const [jobs, setJobs] = useState([]); //---------- jobs map feature
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://172.25.113.163:3000/api/jobs/map") // Change YOUR_IP_ADDRESS
      .then((response) => response.json())
      .then((data) => {
        if (data.jobs) {
          const validJobs = data.jobs.filter(job => job.latitude && job.longitude);
          setJobs(validJobs); 
        } else {
          console.error("Unexpected API response:", data);
          Alert.alert("Error", "Invalid job data received.");
        }
      })
      .catch((error) => Alert.alert("Error fetching jobs", error.message))
      .finally(() => setLoading(false));
  }, []);                          // -------------- jobs map feature

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
        {loading ? (
          <ActivityIndicator size="large" color="#213E64" />
        ) : (
          <MapboxGL.MapView style={styles.map}>
            <MapboxGL.Camera
              zoomLevel={12}
              centerCoordinate={[-78.8658, 43.8975]} // Default to Oshawa
            />

            {jobs.length > 0 ? (
              jobs.map((job, index) => (
                <MapboxGL.PointAnnotation
                  key={index}
                  id={`job-${index}`}
                  coordinate={[job.longitude, job.latitude]}
                >
                  <View style={styles.markerDot}/>
                </MapboxGL.PointAnnotation>
              ))
            ) : (
              <Text style={styles.noJobsText}>No jobs available in this area.</Text>
            )}
          </MapboxGL.MapView>
        )}
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

  // 🔹 Added styles for job markers
  marker: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 10,
  },
  markerContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    padding: 5,
    borderRadius: 10,
  },
  markerDot: {
    width: 10,
    height: 10,
    backgroundColor: "red",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "white",
  },
  markerText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  noJobsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#333",
  },
});
