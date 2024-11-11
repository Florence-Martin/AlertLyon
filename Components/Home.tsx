import React from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import ParallaxScrollView from "./ParallaxScrollView";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import ImageViewer from "./ImageViewer";

const PlaceholderImage = require("../assets/images/accueil.jpg");

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
      <ThemedView>
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
    marginTop: -30,
    width: "100%",
    alignSelf: "stretch",
    alignItems: "center",
    padding: 16,
  },
  bannerText: {
    color: "#383E42",
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#383E42",
    fontSize: 24,
    fontWeight: "semibold",
    textAlign: "center",
  },

  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
});
