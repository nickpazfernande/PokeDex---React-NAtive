import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PokeDex from '../screens/PokeDex';
import Pokemon from '../screens/Pokemon';

const Stack = createNativeStackNavigator();

export default function PokedexNavigation() {
  return (
    <Stack.Navigator >
        <Stack.Screen name='Pokedex' component={PokeDex} options={{
            headerShown: false,
            title: "",
            headerTransparent: true
        }}/>
        <Stack.Screen name='Pokemon' component={Pokemon} options={{
            title: "",
            headerTransparent: true,
        }}/>

    </Stack.Navigator>
  )
}