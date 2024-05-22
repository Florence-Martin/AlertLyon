import React, {useState} from "react";
import { StyleSheet, View, Text} from "react-native";
import { Picker } from '@react-native-picker/picker';
import { StatusBar } from "expo-status-bar";
import ImageViewer from "./ImageViewer";
import { HomeProps } from "../Navigation/StackNavigation";

const PlaceholderImage = require("../assets/images/accueil-image.jpeg");

const Home: React.FC<HomeProps> = ({ navigation, route }) => {
const [selectedIncidentType, setSelectedIncidentType] = useState<string>("");
const incidentTypes = [
  { label: "Accident", value: "accident" },
  { label: "Travaux", value: "travaux" },
  { label: "Propreté", value: "proprete" },
  { label: "Éclairage", value: "eclairage" },
];

return (
  <View style={styles.container}>
    <View style={styles.banner}>
      <Text style={styles.bannerText}>Bienvenue à Lyon</Text>
      <Text style={styles.title}>
        Alertez-nous !{"\n"} Accident, travaux, problème de voirie
        (propreté, éclairage,...) !
      </Text>
    </View>
    <View>
      <ImageViewer placeholderImageSource={PlaceholderImage} />
    </View>
    <View style={styles.pickerContainer}>
      <Text style={styles.pickerLabel}>Type d'incident</Text>
      <Picker
        selectedValue={selectedIncidentType}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedIncidentType(itemValue)}
      >
        {incidentTypes.map((type) => (
          <Picker.Item key={type.value} label={type.label} value={type.value} />
        ))}
      </Picker>
    </View>
    <StatusBar style="auto" />
  </View>
);
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  banner: {
    marginBottom: 20,
  },
  bannerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
  },
  pickerContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
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
