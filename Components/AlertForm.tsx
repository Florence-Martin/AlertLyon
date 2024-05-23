import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Image,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import emailjs from "emailjs-com";
import {
  REACT_APP_SERVICE_ID,
  REACT_APP_TEMPLATE_ID,
  REACT_APP_USER_ID,
} from "@env";
import MapViewer from "./MapViewer";
import {
  AlertezNousProps,
  TemplateParams,
  IncidentType,
} from "../Navigation/StackNavigation";

const AlertForm: React.FC<AlertezNousProps> = ({ navigation, route }) => {
  const incidentTypes: IncidentType[] = [
    { value: "accident", label: "Accident" },
    { value: "travaux", label: "Travaux" },
    { value: "voirie", label: "Voirie" },
    { value: "propreté", label: "Propreté" },
    { value: "éclairage", label: "Eclairage" },
    { value: "voisinage", label: "Voisinage" },
    { value: "animaux", label: "Animaux" },
  ];

  const [selectedIncidentType, setSelectedIncidentType] = useState<string>(
    incidentTypes[0].value
  );

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
    // // Demande de permission d'accès à la galerie
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Autorisez-vous l'accès à la caméra ?");
      return;
    }

    // Ouverture de la galerie pour sélectionner une image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    // Gestion du résultat de la sélection
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPhoto(result.assets[0].uri);
      Alert.alert("Merci pour ce signalement");
    } else {
      Alert.alert("Vous n'avez sélectionné aucune image !");
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phoneNumber: string): boolean => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = () => {
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

    emailjs
      .send(
        REACT_APP_SERVICE_ID,
        REACT_APP_TEMPLATE_ID,
        templateParams,
        REACT_APP_USER_ID
      )
      .then((response) => {
        console.log("E-mail envoyé avec succès", response);
        Alert.alert("Succès", "L'e-mail a été envoyé avec succès.");
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de l'e-mail", error);
        Alert.alert(
          "Erreur",
          "Une erreur est survenue lors de l'envoi de l'e-mail."
        );
      });
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const onChangeTime = (event: any, selectedTime?: Date) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  return (
    <ScrollView>
      <MapViewer />

      <Picker
        selectedValue={selectedIncidentType}
        style={styles.selectInput}
        onValueChange={(itemValue) => setSelectedIncidentType(itemValue)}
      >
        {incidentTypes.map((type) => (
          <Picker.Item key={type.value} label={type.label} value={type.value} />
        ))}
      </Picker>

      <View style={styles.container}>
        <Text style={styles.label}>Type d'incident sélectionné :</Text>
        <Text style={styles.labelAlert}>{selectedIncidentType}</Text>
        <Text style={styles.label}>Description</Text>
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
              onChange={onChangeDate}
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
              onChange={onChangeTime}
            />
          )}
        </View>

        <View style={styles.photoChooseButton}>
          <Button title="Choisir une photo" onPress={pickImage} />
          {photo && <Image source={{ uri: photo }} style={styles.image} />}
        </View>
        <View style={styles.sendFormButton}>
          <Button title="Envoyer" onPress={handleSubmit} />
        </View>
      </View>
    </ScrollView>
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
});
