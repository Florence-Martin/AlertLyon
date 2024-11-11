import React from "react";
import { Picker } from "@react-native-picker/picker";
import { IncidentType } from "../Navigation/StackNavigation";
import { StyleSheet } from "react-native";

interface IncidentTypePickerProps {
  selectedIncidentType: string;
  onSelectIncidentType: (value: string) => void;
}

const IncidentTypePicker: React.FC<IncidentTypePickerProps> = ({
  selectedIncidentType,
  onSelectIncidentType,
}) => {
  const incidentTypes: IncidentType[] = [
    { value: "accident", label: "Accident" },
    { value: "travaux", label: "Travaux" },
    { value: "voirie", label: "Voirie" },
    { value: "propreté", label: "Propreté" },
    { value: "éclairage", label: "Eclairage" },
    { value: "voisinage", label: "Voisinage" },
    { value: "animaux", label: "Animaux" },
  ];

  return (
    <Picker
      style={styles.container}
      selectedValue={selectedIncidentType}
      onValueChange={onSelectIncidentType}
      itemStyle={styles.itemStyle}
    >
      {incidentTypes.map((type) => (
        <Picker.Item key={type.value} label={type.label} value={type.value} />
      ))}
    </Picker>
  );
};

export default IncidentTypePicker;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 2,
    backgroundColor: "#c34a8b",
    borderRadius: 8,
    marginBottom: 16,
  },
  itemStyle: {
    fontSize: 30,
    color: "#ffffff",
    fontWeight: "bold",
  },
});
