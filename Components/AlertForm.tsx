// soumission du formulaire et affichage
import React from "react";
import { Alert, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  AlertezNousProps,
  TemplateParams,
} from "../Navigation/StackNavigation";
import ParallaxScrollView from "./ParallaxScrollView";
import IncidentReportForm from "./IncidentReportForm";
import MapViewer from "./MapViewer";

const AlertForm: React.FC<AlertezNousProps> = ({ navigation, route }) => {
  const handleSubmit = (templateParams: TemplateParams) => {
    fetch("http://localhost:5000/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(templateParams),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          Alert.alert("Succès", "L'e-mail a été envoyé avec succès.");
        } else {
          Alert.alert(
            "Erreur",
            "Une erreur est survenue lors de l'envoi de l'e-mail."
          );
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de l'e-mail", error);
        Alert.alert(
          "Erreur",
          "Une erreur est survenue lors de l'envoi de l'e-mail."
        );
      });
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons
          size={310}
          name="code"
          style={{
            color: "#808080",
            position: "absolute",
            bottom: -90,
            left: -35,
          }}
        />
      }
    >
      <MapViewer />

      <IncidentReportForm onSubmit={handleSubmit} />
    </ParallaxScrollView>
  );
};

export default AlertForm;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#383E42",
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
    paddingBottom: 2,
  },
  labelAlert: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    padding: 2,
    color: "#fff",
    marginBottom: 8,
  },
  blockName: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
    color: "#fff",
  },
  selectInput: {
    marginTop: -80,
    paddingLeft: 80,
    paddingRight: 80,
  },
  placeholder: {
    color: "#F5F5F5",
    opacity: 0.5,
    fontSize: 8,
  },
  multilineInput: {
    height: 100,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  photoChooseButton: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 2,
    borderRadius: 5,
    marginBottom: 16,
    textAlign: "center",
  },
  sendFormButton: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 2,
    borderRadius: 5,
    marginBottom: 16,
    textAlign: "center",
  },
  footerContainer: {
    alignItems: "center",
    backgroundColor: "gray",
    borderRadius: 8,
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 24,
    marginRight: 24,
  },
  datePickerButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
    textAlign: "center",
  },
  blockDateTime: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  timePickerButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
    textAlign: "center",
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
});
