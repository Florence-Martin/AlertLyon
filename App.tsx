import React from 'react';
import { StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './Components/Home';
import AlertForm from './Components/AlertForm';

// Définir les types pour les routes et les paramètres
type RootTabParamList = {
    Accueil: undefined;
    'Alertez-nous': undefined;
};

// Créer l'objet Tab pour la navigation par onglets
const Tab = createBottomTabNavigator<RootTabParamList>();

const App: React.FC = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName: string = '';
                        if (route.name === "Accueil") {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === "Alertez-nous") {
                            iconName = focused ? 'alert-circle' : 'alert-circle-outline';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#25292e',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Accueil" component={Home} />
                <Tab.Screen name="Alertez-nous" component={AlertForm} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#383E42',
    },
});
