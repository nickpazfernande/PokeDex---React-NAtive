import { ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPokemonDetailsApi } from "../api/pokemon";
import Header from "../components/Pokemon/Header";
import Type from "../components/Pokemon/Type";
import Stats from "../components/Pokemon/Stats";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function Pokemon(props) {
  const [pokemon, setPokemon] = useState(null);
  const {
    route: { params },
    navigation,
  } = props;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => null,
      headerLeft: () => <Icon name="arrow-left" color="#fff" size={20} style={{marginLeft: 20}} onPress={() => navigation.goBack()} />,
    });
  }, [navigation, params]);
  useEffect(() => {
    //useEffect ejectua una funcion async
    (async () => {
      try {
        //con await ejecuto la funcion con el id de nuestro pokemon seleccionado.
        const response = await getPokemonDetailsApi(params.id);
        //Seteamos la informacion en nuestro estado de pokemon.
        setPokemon(response);
      } catch (error) {
        //Si falla volvemos hacia atras.
        navigation.goBack();
      }
    })();
    //Cada vez que cambie el params, se ejecuta este useEffect.
  }, [params.id]);

  //Si no existe pokemon que no retorne nada.
  if (!pokemon) return null;

  return (
    <SafeAreaView>
      <ScrollView>
        <Header
          name={pokemon.name}
          order={pokemon.order}
          image={pokemon.sprites.front_default}
          type={pokemon.types[0].type.name}
        />
        <Type types={pokemon.types} />
        <Stats stats={pokemon.stats} />
      </ScrollView>
    </SafeAreaView>
  );
}
