import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Homepage({ navigation }) {
  const features = [
    {
      title: "Jobs Board",
      image: require("./Jobboardimage.png"),
      screen: "JobBoard",
    },
    {
      title: "Jobs Maps",
      image: require("./Jobsmapimage.png"),
      screen: "JobMap",
    },
    {
      title: "Career Explorer",
      image: require("./Careerexplorerimage.png"),
      screen: "CareerExplorer",
    },
    {
      title: "Career Calculator",
      image: require("./Careercalculatorimage.png"),
    },
    {
      title: "Resume Builder",
      image: require("./Resumebuilderimage.png"),
      screen: "ResumeBuilder",
    },
    { title: "Cover Letter", image: require("./Coverletterimage.png") },
  ];

  // Create an array of animated values for each card
  const animatedValues = useRef(
    features.map(() => new Animated.Value(0))
  ).current;

  // Animate cards one by one
  useEffect(() => {
    const animations = features.map((_, index) =>
      Animated.timing(animatedValues[index], {
        toValue: 1,
        duration: 500, // Animation duration
        delay: index * 200, // Delay between animations
        useNativeDriver: true, // Use native driver for better performance
      })
    );

    // Start all animations
    Animated.stagger(200, animations).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Jobs First Durham</Text>
          <Text style={styles.subtitle}>Search & Career Development Tools</Text>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.button}>
            <Icon name="bars" size={20} color="#222222" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Feature Cards */}
      <ScrollView contentContainerStyle={styles.content}>
        {features.map((feature, index) => {
          const cardStyle = {
            opacity: animatedValues[index], // Fade in
            transform: [
              {
                translateY: animatedValues[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0], // Slide up from bottom
                }),
              },
            ],
          };

          return (
            <Animated.View key={index} style={[styles.card, cardStyle]}>
              <TouchableOpacity
                onPress={() => {
                  if (feature.screen) navigation.navigate(feature.screen);
                }}
                style={styles.cardContent}
              >
                <Image source={feature.image} style={styles.cardImage} />
                <Text style={styles.cardTitle}>{feature.title}</Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  logo: { width: 50, height: 50, marginRight: 10 },
  headerContent: { flex: 1 },
  title: { fontSize: 30, fontWeight: "bold", color: "#213E64" },
  subtitle: { fontSize: 17, color: "#213E64", fontWeight: "bold" },
  headerButtons: { flexDirection: "row" },
  button: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 5,
    marginLeft: 10,
  },
  content: { padding: 10, alignItems: "center" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#213E64",
    borderRadius: 10,
    marginVertical: 7,
    width: "100%",
    height: 95,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    borderColor: "black",
    borderWidth: 1,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  cardImage: { width: 168, height: 95, borderRadius: 10 },
  cardTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
    paddingLeft: 30,
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
});
