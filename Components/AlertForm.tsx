import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, Pressable, ScrollView, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import emailjs from 'emailjs-com';
import { REACT_APP_SERVICE_ID, REACT_APP_TEMPLATE_ID, REACT_APP_USER_ID } from '@env';
import ButtonImage from './ButtonImage';
import MapViewer from './MapViewer';
import { AlertezNousProps, TemplateParams } from "../Navigation/StackNavigation";

const AlertForm: React.FC<AlertezNousProps> = ({ navigation, route }) => {
    const [alertType, setAlertType] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [firstname, setFirstname] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [postcode, setPostcode] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [date, setDate] = useState<Date>(new Date());
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const [time, setTime] = useState<Date>(new Date());
    const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
    const [photo, setPhoto] = useState<string | null>(null);

    const handleChoosePhoto = async () => {
        try {
            const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
            if (status !== 'granted') {
                Alert.alert('Permission non accordée', 'Permission non accordée pour accéder à la bibliothèque de médias.');
                return;
            }
    
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
    
            if (!result.cancelled) {
                setPhoto(result.uri);
            }
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la sélection de la photo.');
        }
    };

    const handleSubmit = () => {
        if (!alertType || !name || !email || !phoneNumber || !description || !address || !postcode || !city || !date) {
            Alert.alert('Erreur', 'Tous les champs doivent être remplis.');
            return;
        }

        const templateParams: TemplateParams = {
            alertType,
            name,
            firstname,
            description,
            address,
            postcode,
            city,
            email,
            phoneNumber,
            date: date.toISOString(),
            time: time.toISOString(),
        };

        emailjs
            .send(REACT_APP_SERVICE_ID, REACT_APP_TEMPLATE_ID, templateParams, REACT_APP_USER_ID)
            .then((response) => {
                console.log('E-mail envoyé avec succès', response);
                Alert.alert('Succès', 'L\'e-mail a été envoyé avec succès.');
            })
            .catch((error) => {
                console.error('Erreur lors de l\'envoi de l\'e-mail', error);
                Alert.alert('Erreur', 'Une erreur est survenue lors de l\'envoi de l\'e-mail.');
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
            <View style={styles.container}>
                <Text style={styles.label}>Type d'alerte</Text>
                <TextInput
                    style={styles.input}
                    value={alertType}
                    onChangeText={setAlertType}
                />
                
                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={[styles.input, styles.multilineInput]}
                    value={description}
                    onChangeText={setDescription}
                    multiline
                />
                
                <Text style={styles.label}>Nom</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />

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
                <TextInput
                    style={styles.input}
                    value={city}
                    onChangeText={setCity}
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>Numéro de téléphone</Text>
                <TextInput
                    style={styles.input}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />

                <Text style={styles.label}>Date</Text>
                <Pressable onPress={() => setShowDatePicker(true)}>
                    <Text style={styles.datePickerButton}>{date.toDateString()}</Text>
                </Pressable>
                {showDatePicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onChangeDate}
                    />
                )}

                <Text style={styles.label}>Heure</Text>
                <Pressable onPress={() => setShowTimePicker(true)}>
                    <Text style={styles.timePickerButton}>{time.toLocaleTimeString()}</Text>
                </Pressable>
                {showTimePicker && (
                    <DateTimePicker
                        value={time}
                        mode="time"
                        display="default"
                        onChange={onChangeTime}
                    />
                )}

                <View style={styles.photoContainer}>
                    <Button title="Choisir une photo" onPress={handleChoosePhoto} />
                    {photo && <Image source={{ uri: photo }} style={styles.image} />}
                </View>

                <Button title="Envoyer" onPress={handleSubmit} />
            </View>
        </ScrollView>
    );
}

export default AlertForm;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#383E42',
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff',
        paddingBottom: 2,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 16,
        paddingHorizontal: 8,
        color: '#fff',
    },
    multilineInput: {
        height: 100,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 16,
    },
    photoContainer: {
        alignItems: 'center',
    },
    datePickerButton: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 16,
        textAlign: 'center',
    },
    timePickerButton: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 16,
        textAlign: 'center',
    },
});
