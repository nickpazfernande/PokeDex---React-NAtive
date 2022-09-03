import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccountNavigation from "./AccountNavigation";
import FavoriteNavigation from "./FavoriteNavigation";
import PokedexNavigation from "./PokedexNavigation";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Favorite"
        component={FavoriteNavigation}
        options={{
          tabBarLabel: "Favoritos",
          headerShown: false,
          tabBarIcon: (
            { color, size } // <--
          ) => <Icon name="heart" color={color} size={size} />,
        }}
      />
      <Tab.Screen name="PokeDex" component={PokedexNavigation} options={{
        tabBarLabel: "",
        headerShown: false,
        tabBarIcon: () => renderPokeBall()

      }} />
      <Tab.Screen name="Account" component={AccountNavigation} options={{
        tabBarLabel:"Mi cuenta",
        headerTitle: "Mi cuenta",
        tabBarIcon: (
            { color, size } // <--
          ) => <Icon name="user" color={color} size={size} />,
      }} />
    </Tab.Navigator>
  );
}

function renderPokeBall () {
    return (
        <Image source={require('../assets/pokeball.png')} style={{ width: 75, height:75, top: -20}}/>
    )
}