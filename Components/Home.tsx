import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import ImageViewer from "./ImageViewer";
import { HomeProps } from "../Navigation/StackNavigation";

const PlaceholderImage = require("../assets/images/accueil-image.jpeg");

const Home: React.FC<HomeProps> = ({ navigation, route }) => {

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Bienvenue à Lyon</Text>
        <Text style={styles.title}>
          Alertez-nous !{"\n"} Accident, travaux, problème de voirie (propreté,
          éclairage,...) !
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  banner: {
    marginBottom: 20,
  },
  bannerText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
  },
  pickerContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: 200,
  },
});
