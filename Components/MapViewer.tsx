import React, { useState, useEffect } from "react";
import MapView, { Marker, Circle, Callout, LatLng } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
      setIsLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location: LocationObject = await Location.getCurrentPositionAsync({});
      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      try {
        const response = await axios.get(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${location.coords.latitude}&lon=${location.coords.longitude}&apiKey=${REACT_APP_API_KEY}`
        );
        const formattedAddress =
          response.data.features[0]?.properties?.formatted;
        setAddress(formattedAddress);
      } catch (error) {
        console.error("Erreur lors de la requête Axios : ", error);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 45.7751,
          longitude: 4.8271,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        //mise à jour du pin qd l'utilisateur bouge
        onUserLocationChange={(e: any) => {
          console.log("onUserLocationChange", e.nativeEvent.coordinate);
          updatePin(e.nativeEvent.coordinate);
        }}
      >
        <Marker
          coordinate={pin}
          title="Localisation"
          description={address || "Chargement de l'adresse"}
          pinColor="red"
          draggable={true}
          //mise à jour du pin qd le marker bouge
          onDragStart={(e) => {
            console.log("Drag start", e.nativeEvent.coordinate);
            updatePin(e.nativeEvent.coordinate);
          }}
          onDragEnd={(e) => {
            console.log("Drag end", e.nativeEvent.coordinate);
            updatePin(e.nativeEvent.coordinate);
          }}
        >
          <Callout style={styles.callout}>
            <Text>{address}</Text>
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
  },
  callout: {
    width: 50,
    height: 50,
  },
});
