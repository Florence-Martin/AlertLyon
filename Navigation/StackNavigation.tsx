import { RouteProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

// Définir les types de paramètres pour les écrans du Stack Navigator
export type RootTabParamList = {
  Accueil: undefined;
  "Alertez-nous": undefined;
};

// Définir HomeProps pour le composant Home
export interface HomeProps {
  navigation: BottomTabNavigationProp<RootTabParamList, "Accueil">;
  route: RouteProp<RootTabParamList, "Accueil">;
}

// Définir IncidentType pour le composant AlertForm
export interface IncidentType {
    value: string;
    label: string;
  }

// Définir TemplateParams pour les paramètres du formulaire d'alerte
export interface TemplateParams {
  [key: string]: string | Date;
  selectedIncidentType: string;
  name: string;
  firstname: string;
  description: string;
  address: string;
  postcode: string;
  city: string;
  email: string;
  phoneNumber: string;
  date: Date;
  time: Date;
}

// Types pour les props de navigation
export interface AlertezNousProps {
  navigation: BottomTabNavigationProp<RootTabParamList, "Alertez-nous">;
  route: RouteProp<RootTabParamList, "Alertez-nous">;
}
