import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import ImageViewer from "./ImageViewer";
import { HomeProps } from "../Navigation/StackNavigation";

const PlaceholderImage = require("../assets/images/accueil-image.jpeg");

const Home: React.FC<HomeProps> = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Bienvenue &agrave; Simplonville</Text>
        <Text style={styles.title}>
          Alertez-nous !{"\n"} Accident, travaux, probl&egrave;me de voirie
          (propret&eacute;, &eacute;clairage,...) !
        </Text>
      </View>
      <View>
        <ImageViewer placeholderImageSource={PlaceholderImage} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  banner: {
    backgroundColor: "#383E42",
    width: "100%",
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    marginTop: 4,
  },

  title: {
    color: "white",
    width: "100%",
    textAlign: "center",
  },
  image: {
    width: 320,
    height: 400,
  },
});
