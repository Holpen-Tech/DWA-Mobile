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
  Share,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [savedJobIds, setSavedJobIds] = useState(new Set());

  useEffect(() => {
    fetch("http://172.25.89.88:3000/api/jobs") // do make sure to include your IP address here
      .then((response) => response.json())
      .then((data) => {
        setJobData(data);
        setFilteredJobs(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const loadSavedJobs = async () => {
      try {
        const saved = await AsyncStorage.getItem("savedJobs");
        if (saved) {
          const savedJobs = JSON.parse(saved);
          setSavedJobIds(new Set(savedJobs.map((job) => job.id)));
        }
      } catch (e) {
        console.error("Failed to load saved jobs", e);
      }
    };
    loadSavedJobs();
  }, []);

  // Add this toggle save function
  const toggleSave = async (item) => {
    try {
      const saved = await AsyncStorage.getItem("savedJobs");
      let savedJobs = saved ? JSON.parse(saved) : [];

      const existingIndex = savedJobs.findIndex((j) => j.id === item._id);

      if (existingIndex > -1) {
        // Remove if already saved
        savedJobs = savedJobs.filter((j) => j.id !== item._id);
      } else {
        // Add new saved job
        savedJobs.push({
          id: item._id,
          title: item.job_title,
          employer: item.employer,
          url: item.url,
          skillMatch: "N/A",
          status: "Interested",
        });
      }

      await AsyncStorage.setItem("savedJobs", JSON.stringify(savedJobs));
      setSavedJobIds(new Set(savedJobs.map((job) => job.id)));
    } catch (e) {
      console.error("Failed to save job", e);
    }
  };

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
  const handleShare = async (job) => {
    try {
      const result = await Share.share({
        message: `Check out this job opportunity: ${job.job_title}\n${job.url}`,
        title: `Share ${job.job_title} Position`,
        url: job.url, // Some platforms may use this
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with activity type of result.activityType
        } else {
          // Shared
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
      }
    } catch (error) {
      console.error("Error sharing:", error.message);
    }
  };

  const renderJobCard = ({ item }) => {
    const formattedDate = new Date(item.post_date).toISOString().split("T")[0];
    const jobType = item.type === "PT" ? "Part Time" : "Full Time";
    const isSaved = savedJobIds.has(item._id);

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
            <View style={styles.buttonContent}>
              <Text style={styles.actionText}>Go to job post</Text>
              <Icon name="arrow-right" size={14} color="#fff" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, isSaved && styles.savedButton]}
            onPress={() => toggleSave(item)}
          >
            <View style={styles.buttonContent}>
              <Text style={[styles.actionText, isSaved && styles.savedText]}>
                {isSaved ? "Saved" : "Save job post"}
              </Text>
              <Icon
                name={isSaved ? "bookmark" : "bookmark-o"}
                size={14}
                color={isSaved ? "#213E64" : "#fff"}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleShare(item)}
          >
            <View style={styles.buttonContent}>
              <Icon name="share" size={14} color="#fff" />
              <Text style={styles.actionText}>Share</Text>
            </View>
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
        <View style={styles.searchInputContainer}>
          <Icon
            name="search"
            size={16}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search jobs..."
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#666"
          />
        </View>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterVisible(true)}
        >
          <Text style={styles.filterText}>
            Filters <Icon name="filter" size={14} color="#fff" />
          </Text>
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
    alignItems: "center",
    gap: 5,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  searchIcon: {
    padding: 10,
    marginLeft: 5,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    paddingLeft: 0, // Adjust based on icon spacing
    fontSize: 14,
    color: "#213E64",
  },
  filterText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
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
  jobActions: { flexDirection: "row", justifyContent: "space-between", gap: 5 },
  actionButton: {
    backgroundColor: "#0056b3",
    padding: 8,
    borderRadius: 5,
  },
  savedButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#213E64",
  },
  actionText: {
    fontSize: 12,
    color: "#fff",
  },
  savedText: {
    color: "#213E64",
  },
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
    paddingHorizontal: 10,
    borderRadius: 10,
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
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  actionButton: {
    backgroundColor: "#0056b3",
    padding: 8,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  savedButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#213E64",
  },
  actionText: {
    fontSize: 12,
    color: "#fff",
  },
  savedText: {
    color: "#213E64",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  actionButton: {
    backgroundColor: "#0056b3",
    padding: 8,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  savedButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#213E64",
  },
  actionText: {
    fontSize: 12,
    color: "#fff",
  },
  savedText: {
    color: "#213E64",
  },
});
