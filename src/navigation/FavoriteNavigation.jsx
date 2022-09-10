import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Favorites from '../screens/Favorites';
import PokemonScreen from '../screens/Pokemon'

const Stack = createNativeStackNavigator();
export default function FavoriteNavigation() {
  return (
    <Stack.Navigator >
        <Stack.Screen name='Favorites' component={Favorites} options={{title: 'Favoritos'}} />
        <Stack.Screen name='Pokemon' component={PokemonScreen} options={{
          title: "",
          headerTransparent: true
        }} />
    </Stack.Navigator>
  )
}