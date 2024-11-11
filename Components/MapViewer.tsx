import React, { useState, useEffect } from "react";
import MapView, { Marker, Circle, Callout, LatLng } from "react-native-maps";
import { StyleSheet, View, Text, ActivityIndicator, Alert } from "react-native";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import axios from "axios";
import { REACT_APP_API_KEY } from "@env";

interface Pin {
  latitude: number;
  longitude: number;
}

const MapViewer: React.FC = () => {
  const [pin, setPin] = useState<Pin>({
    latitude: 45.7751,
    longitude: 4.8271,
  });

  const [address, setAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const updatePin = (coordinate: LatLng) => {
    if (
      coordinate &&
      typeof coordinate.latitude === "number" &&
      typeof coordinate.longitude === "number"
    ) {
      setPin({
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          Alert.alert(
            "Erreur",
            "La permission d'accéder à la localisation a été refusée."
          );
          setIsLoading(false);
          return;
        }

        let location: LocationObject = await Location.getCurrentPositionAsync(
          {}
        );
        updatePin({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        // Requête pour obtenir l'adresse
        const response = await axios.get(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${location.coords.latitude}&lon=${location.coords.longitude}&apiKey=${REACT_APP_API_KEY}`
        );
        const formattedAddress =
          response.data.features[0]?.properties?.formatted;
        setAddress(formattedAddress);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de la localisation : ",
          error
        );
        setErrorMsg("Erreur lors de la récupération de la localisation.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Chargement de la carte...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: pin.latitude,
          longitude: pin.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        onUserLocationChange={(e: any) => {
          if (e.nativeEvent.coordinate) {
            updatePin(e.nativeEvent.coordinate);
          }
        }}
      >
        <Marker
          coordinate={pin}
          title="Localisation"
          description={address || "Chargement de l'adresse..."}
          pinColor="red"
          draggable={true}
          onDragEnd={(e) => updatePin(e.nativeEvent.coordinate)}
        >
          <Callout style={styles.callout}>
            <Text>{address || "Chargement..."}</Text>
          </Callout>
        </Marker>
        <Circle center={pin} radius={100} />
      </MapView>
    </View>
  );
};

export default MapViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: 250,
    borderRadius: 8,
  },
  callout: {
    width: 50,
    height: 50,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});
