// interface utilisateur et la logique du formulaire
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import IncidentTypePicker from "./IncidentTypePicker";
import { TemplateParams } from "../Navigation/StackNavigation";

interface IncidentReportFormProps {
  onSubmit: (templateParams: TemplateParams) => void;
}

const IncidentReportForm: React.FC<IncidentReportFormProps> = ({
  onSubmit,
}) => {
  const [selectedIncidentType, setSelectedIncidentType] =
    useState<string>("accident");
  const [description, setDescription] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [postcode, setPostcode] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [time, setTime] = useState<Date>(new Date());
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [photo, setPhoto] = useState<string | null>(null);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Autorisez-vous l'accès à la caméra ?");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPhoto(result.assets[0].uri);
      Alert.alert("Merci pour ce signalement");
    } else {
      Alert.alert("Vous n'avez sélectionné aucune image !");
    }
  };

  const handleFormSubmit = () => {
    if (
      !selectedIncidentType ||
      !name ||
      !email ||
      !phoneNumber ||
      !description ||
      !address ||
      !postcode ||
      !city ||
      !date
    ) {
      Alert.alert("Erreur", "Tous les champs doivent être remplis.");
      return;
    }

    const templateParams: TemplateParams = {
      selectedIncidentType,
      name,
      firstname,
      description,
      address,
      postcode,
      city,
      email,
      phoneNumber,
      date,
      time,
    };
    onSubmit(templateParams);
  };

  return (
    <View style={styles.container}>
      <IncidentTypePicker
        selectedIncidentType={selectedIncidentType}
        onSelectIncidentType={setSelectedIncidentType}
      />
      <Text style={styles.label}>
        {`Description (${selectedIncidentType})`}
      </Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Nom</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Prénom</Text>
      <TextInput
        style={styles.input}
        value={firstname}
        onChangeText={setFirstname}
      />

      <Text style={styles.label}>Adresse</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />

      <Text style={styles.label}>Code Postal</Text>
      <TextInput
        style={styles.input}
        value={postcode}
        onChangeText={setPostcode}
      />

      <Text style={styles.label}>Ville</Text>
      <TextInput style={styles.input} value={city} onChangeText={setCity} />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />

      <Text style={styles.label}>Numéro de téléphone</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <View style={styles.blockDateTime}>
        <Pressable
          onPress={() => setShowDatePicker(true)}
          style={styles.datePickerButton}
        >
          <Ionicons name="calendar" size={24} color="#25292e" />
        </Pressable>
        {showDatePicker && (
          <DateTimePicker
            testID="datePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || date;
              setShowDatePicker(false);
              setDate(currentDate);
            }}
          />
        )}

        <Pressable
          onPress={() => setShowTimePicker(true)}
          style={styles.timePickerButton}
        >
          <Ionicons name="time" size={24} color="black" />
        </Pressable>
        {showTimePicker && (
          <DateTimePicker
            testID="timePicker"
            value={time}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={(event, selectedTime) => {
              const currentTime = selectedTime || time;
              setShowTimePicker(false);
              setTime(currentTime);
            }}
          />
        )}
      </View>
      <Pressable style={styles.photoButton} onPress={pickImage}>
        <Text style={styles.photoButtonText}>Choisir une photo</Text>
      </Pressable>
      {photo && <Image source={{ uri: photo }} style={styles.image} />}

      <Pressable style={styles.submitButton} onPress={handleFormSubmit}>
        <Text style={styles.submitButtonText}>Envoyer</Text>
      </Pressable>
    </View>
  );
};

export default IncidentReportForm;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#383E42",
    borderRadius: 8,
  },
  label: {
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#fff",
    paddingBottom: 2,
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
  multilineInput: {
    height: 100,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  blockDateTime: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  datePickerButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
  },
  timePickerButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
  },
  photoButton: {
    backgroundColor: "#c34a8b",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  photoButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#8bc34a",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
