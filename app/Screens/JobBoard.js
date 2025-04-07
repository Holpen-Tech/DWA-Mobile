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
  Linking,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function JobBoard({ navigation }) {
  const [jobData, setJobData] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    fetch("http://172.25.113.163:3000/api/jobs") // Greatness: chances are, you will get an error, so add your IP address appropriately
      .then((response) => response.json())
      .then((data) => {
        // Check if data.jobs exists, otherwise use empty array
        const jobsArray = data.jobs || [];
        setJobData(jobsArray);
        setFilteredJobs(jobsArray);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);
  
  const applyFilters = () => {
    let filtered = [...jobData];

    if (selectedType) {
      filtered = filtered.filter((job) => job.type === selectedType);
    }
    if (selectedRegion) {
      filtered = filtered.filter((job) => job.region === selectedRegion);
    }
    if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.post_date) - new Date(a.post_date));
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.post_date) - new Date(b.post_date));
    }

    setFilteredJobs(filtered);
    setFilterVisible(false);
  };

  const clearFilters = () => {
    setSelectedType(null);
    setSelectedRegion(null);
    setSortBy(null);
    setFilteredJobs(jobData);
    setFilterVisible(false);
  };

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
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() =>
              Linking.openURL(item.url).catch((err) =>
                console.error("Failed to open URL", err)
              )
            }
          >
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
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterVisible(true)}
        >
          <Text style={styles.filterText}>Filters</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#213E64" />
      ) : error ? (
        <Text style={styles.errorText}>Error: {error}</Text>
      ) : (
        <FlatList
          data={filteredJobs.filter((job) =>
            job.job_title.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          keyExtractor={(item) => item._id}
          renderItem={renderJobCard}
          contentContainerStyle={styles.jobList}
        />
      )}

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterVisible}
        onRequestClose={() => setFilterVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.filterTitle}>Filter Jobs</Text>

            {/* Job Type */}
            <Text style={styles.filterLabel}>Job Type</Text>
            <View style={styles.filterOptions}>
              <TouchableOpacity
                style={[
                  styles.filterOption,
                  selectedType === "FT" && styles.selectedOption,
                ]}
                onPress={() => setSelectedType("FT")}
              >
                <Text style={styles.optionText}>Full Time</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterOption,
                  selectedType === "PT" && styles.selectedOption,
                ]}
                onPress={() => setSelectedType("PT")}
              >
                <Text style={styles.optionText}>Part Time</Text>
              </TouchableOpacity>
            </View>

            {/* Sorting */}
            <Text style={styles.filterLabel}>Sort By</Text>
            <View style={styles.filterOptions}>
              <TouchableOpacity
                style={[
                  styles.filterOption,
                  sortBy === "newest" && styles.selectedOption,
                ]}
                onPress={() => setSortBy("newest")}
              >
                <Text style={styles.optionText}>Newest</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterOption,
                  sortBy === "oldest" && styles.selectedOption,
                ]}
                onPress={() => setSortBy("oldest")}
              >
                <Text style={styles.optionText}>Oldest</Text>
              </TouchableOpacity>
            </View>

            {/* Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={applyFilters}
              >
                <Text style={styles.buttonText}>Apply Filters</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={clearFilters}
              >
                <Text style={styles.buttonText}>Clear Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  filterButton: {
    backgroundColor: "#213E64",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  filterText: { color: "#fff", fontWeight: "bold" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  filterTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  filterLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
  },
  filterOptions: { flexDirection: "column" },
  filterOption: {
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedOption: { backgroundColor: "#213E64" },
  optionText: { color: "#fff" },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  applyButton: { backgroundColor: "#213E64", padding: 10, borderRadius: 5 },
  clearButton: { backgroundColor: "red", padding: 10, borderRadius: 5 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
