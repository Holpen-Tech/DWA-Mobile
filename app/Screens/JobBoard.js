import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function JobBoard({ navigation }) {
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://172.25.124.8:3000/api/jobs") // Replace with actual API endpoint
      .then((response) => response.json())
      .then((data) => setJobData(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const renderJobCard = ({ item }) => {
    const formattedDate = new Date(item.post_date).toISOString().split("T")[0];
    const jobType = item.type === "PT" ? "Part Time" : "Full Time";

    return (
      <View style={styles.jobCard}>
        <Text style={styles.jobTitle}>{item.job_title}</Text>
        <Text style={styles.jobCompany}>{item.employer}</Text>
        <Text style={styles.jobDetails}>
          {formattedDate} · {item.region} · {jobType}
        </Text>
        <Text style={styles.jobDescription}>{item.excerpt}</Text>
        <View style={styles.jobActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>Go to job post</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>Save job post</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("./DWA-logo.png")} style={styles.logo} />
        <Text style={styles.title}>Jobs Board</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search jobs..."
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Filters</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#213E64" />
      ) : error ? (
        <Text style={styles.errorText}>Error: {error}</Text>
      ) : (
        <FlatList
          data={jobData.filter((job) =>
            job.job_title.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          keyExtractor={(item) => item._id}
          renderItem={renderJobCard}
          contentContainerStyle={styles.jobList}
        />
      )}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.navButton}>
          <Icon name="home" size={20} color="#222222" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Icon name="bookmark" size={20} color="#222222" />
          <Text style={styles.navText}>My Jobs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Icon name="bell" size={20} color="#222222" />
          <Text style={styles.navText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Icon name="gear" size={20} color="#222222" />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  logo: { width: 40, height: 40, marginRight: 10 },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#213E64",
    paddingLeft: 55,
  },
  searchContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  filterButton: {
    backgroundColor: "#213E64",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  filterText: { color: "#fff", fontWeight: "bold" },
  errorText: { color: "red", textAlign: "center", marginTop: 10 },
  jobList: { padding: 10 },
  jobCard: {
    backgroundColor: "#213E64",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  jobTitle: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  jobCompany: { fontSize: 14, color: "#cce4ff", marginVertical: 5 },
  jobDetails: { fontSize: 12, color: "#cce4ff" },
  jobDescription: { fontSize: 14, color: "#fff", marginVertical: 10 },
  jobActions: { flexDirection: "row", justifyContent: "space-between" },
  actionButton: {
    backgroundColor: "#0056b3",
    padding: 8,
    borderRadius: 5,
  },
  actionText: { fontSize: 12, color: "#fff" },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingVertical: 12,
    paddingBottom: 30,
  },
  navButton: { alignItems: "center" },
  navText: { color: "#222222", fontSize: 12 },
});
