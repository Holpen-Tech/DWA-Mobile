import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function JobBoard({ navigation }) {
  const jobData = [
    {
      id: "1",
      title: "Sales/Office Assistant",
      company: "SALES Inc",
      location: "Oshawa",
      type: "Full Time · Permanent",
      description:
        "General office support workers - Small Transportation Company in Oshawa ON, looking for highly motivated Sales / Office assistant.",
      date: "2024-11-17",
    },
    {
      id: "2",
      title: "Machine Tender",
      company: "Epocit Plastic Ltd",
      location: "Pickering",
      type: "Part Time · Permanent",
      description:
        "Pulp mill, papermaking and finishing machine operators: Monday through Thursday 11:00am - 4:00pm, 20HRS/Week @ $18.",
      date: "2024-11-17",
    },
    {
      id: "4",
      title: "Retail Sales Associate",
      company: "Fashion Outlet",
      location: "Whitby",
      type: "Part Time · Temporary",
      description:
        "Fashion outlet in Whitby is looking for part-time retail sales associates to provide excellent customer service and assist with inventory management. Flexible schedule available.",
      date: "2024-11-18",
    },
    {
      id: "5",
      title: "Warehouse Picker",
      company: "Logistics Plus",
      location: "Ajax",
      type: "Full Time · Permanent",
      description:
        "Fast-paced warehouse in Ajax is hiring order pickers to fulfill online orders. Experience with warehouse operations and a forklift certification is preferred.",
      date: "2024-11-19",
    },
    {
      id: "6",
      title: "Graphic Designer",
      company: "Creative Agency",
      location: "Pickering",
      type: "Full Time · Permanent",
      description:
        "Growing creative agency in Pickering is seeking a talented graphic designer to create visually stunning designs for print and digital media. Proficiency in Adobe Creative Suite is required.",
      date: "2024-11-19",
    },
    {
      id: "7",
      title: "Customer Service Representative",
      company: "Telecom Solutions",
      location: "Clarington",
      type: "Part Time · Permanent",
      description:
        "Telecom company in Clarington is looking for customer service representatives to handle inbound inquiries and provide technical support. Strong communication skills and problem-solving abilities are a must.",
      date: "2024-11-20",
    },
    {
      id: "8",
      title: "Administrative Assistant",
      company: "Professional Services",
      location: "Whitby",
      type: "Full Time · Permanent",
      description:
        "Busy professional services firm in Whitby is seeking an experienced administrative assistant to provide support to multiple executives. Responsibilities include scheduling, travel arrangements, and general office duties.",
      date: "2024-11-20",
    },
    {
      id: "9",
      title: "Production Line Worker",
      company: "Manufacturing Corp",
      location: "Ajax",
      type: "Full Time · Permanent",
      description:
        "Manufacturing company in Ajax is hiring production line workers to assemble various products. No prior experience is required, but attention to detail and a strong work ethic are essential.",
      date: "2024-11-21",
    },
    {
      id: "10",
      title: "Digital Marketing Specialist",
      company: "Media Agency",
      location: "Oshawa",
      type: "Full Time · Permanent",
      description:
        "Growing media agency in Oshawa is seeking a digital marketing specialist to execute campaigns across social media, email, and other digital channels. Experience with analytics and content creation is preferred.",
      date: "2024-11-21",
    },
  ];

  const renderJobCard = ({ item }) => (
    <View style={styles.jobCard}>
      <Text style={styles.jobTitle}>{item.title}</Text>
      <Text style={styles.jobCompany}>{item.company}</Text>
      <Text style={styles.jobDetails}>
        {item.date} · {item.location} · {item.type}
      </Text>
      <Text style={styles.jobDescription}>{item.description}</Text>
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require("./DWA-logo.png")} style={styles.logo} />
        <Text style={styles.title}>Jobs Board</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput placeholder="Search jobs..." style={styles.searchInput} />
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Filters</Text>
        </TouchableOpacity>
      </View>

      {/* Job List */}
      <FlatList
        data={jobData}
        keyExtractor={(item) => item.id}
        renderItem={renderJobCard}
        contentContainerStyle={styles.jobList}
      />

      {/* Footer Navigation */}
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
