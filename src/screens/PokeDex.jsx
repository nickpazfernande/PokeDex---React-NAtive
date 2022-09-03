import { View } from "react-native";
import React, { useState, useEffect } from "react";
import { getPokemonApi, getPokemonDetailsByUrlApi } from "../api/pokemon";
import PokemonsList from "../components/PokemonsList";
import { SafeAreaView } from 'react-native-safe-area-context'

export default function PokeDex() {
  //Estado de los pokemons
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);

  //Use efect que se va a ejecutar una sola vez.
  useEffect(() => {
    //Function autoejecutada, para poder agregar async await
    (async () => {
      await loadPokemons();
    })();
    //En los parentesis rectos [] especificamos si queremos que se vuelva a ejecutar cuando cambie algun estado del componente.
  }, []);

  //Function para traer los pokemons
  const loadPokemons = async () => {
    try {
      //Traigo informacion sobre todos los pokemons.
      const response = await getPokemonApi(nextUrl);

      setNextUrl(response.next);
      //Creo array vacio para luego ir agregando la informacion detallada de cada pokemon que obtuve.
      const pokemonsArray = [];
      //Creo un for que va a realizar peticiones obre cada uno de los pokemons obtenidos.
      //Por este motivo es un for await, porque hasta que no termine uno no empieza otra peticion.
      for await (const pokemon of response.results) {
        //De cada pokemon consulto a la otra url que me obtiene informacion detallada.
        const pokemonDetails = await getPokemonDetailsByUrlApi(pokemon.url);
        console.log(pokemonDetails);
        //Lo agrego al array que creamos vacio.
        pokemonsArray.push({
          id: pokemonDetails.id,
          name: pokemonDetails.name,
          type: pokemonDetails.types[0].type.name,
          order: pokemonDetails.order,
          image: pokemonDetails.sprites.front_default,
        });
      }
      //Una vez recorrimos todos los pokemons, lo agregamos al estado. Manteniendo lo que ya teniamos.
      setPokemons([...pokemons, ...pokemonsArray]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView>
      <PokemonsList
        pokemons={pokemons}
        loadPokemons={loadPokemons}
        isNext={nextUrl}
      />
    </SafeAreaView>
  );
}
