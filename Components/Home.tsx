import React from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import ImageViewer from "./ImageViewer";

import ParallaxScrollView from "./ParallaxScrollView";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

const PlaceholderImage = require("../assets/images/accueil-image.jpeg");

const Home: React.FC = () => {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="people" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.bannerText}>
          Bienvenue à Lyon
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Alertez-nous !{"\n"} Accident, travaux, problème de voirie (propreté,
          éclairage,...) !
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.contentContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} />
      </ThemedView>
      <StatusBar style="auto" />
    </ParallaxScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  banner: {
    width: "100%",
    height: 50,
    resizeMode: "cover",
  },
  titleContainer: {
    alignItems: "center",
    padding: 16,
    backgroundColor: "#383E42",
  },
  bannerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  contentContainer: {
    padding: 16,
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
});
