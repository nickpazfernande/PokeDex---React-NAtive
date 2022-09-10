import { Text } from "react-native";
import React, { useState, useCallback } from "react";
import useAuth from "../hooks/useAuth";
import { useFocusEffect } from "@react-navigation/native";
import { getPokemonFavoriteApi } from "../api/favorite";
import { getPokemonDetailsApi } from "../api/pokemon";
import PokemonList from "../components/PokemonsList";
import NoLogged from "../components/NoLogged";

export default function Favorites() {
  const [pokemons, setPokemons] = useState([]);
  const { auth } = useAuth();

  //Utilizamos la combinacion de useFocusEffect + useCallback para hacer la peticion
  //Con esto obtenemos que cada vez que el usuario entre a la pagina se recargue el contenido
  //Permitiendo que vaya a eliminar o agregar mas pokemons a sus favoritos y podes visualizarlos.
  useFocusEffect(
    useCallback(() => {
      if (auth) {
        (async () => {
          const response = await getPokemonFavoriteApi();
          console.log(response);
          const pokemonsArray = [];
          //Creo un for que va a realizar peticiones obre cada uno de los pokemons obtenidos.
          //Por este motivo es un for await, porque hasta que no termine uno no empieza otra peticion.
          for await (const id of response) {
            //De cada pokemon consulto a la otra url que me obtiene informacion detallada.
            const pokemonDetails = await getPokemonDetailsApi(id);
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

          setPokemons(pokemonsArray);
        })();
      }
    }, [auth])
  );

  //Si existe auth mostramos la lista de pokemons. 
  return !auth ? (
    <NoLogged />
  ) : (
    <PokemonList pokemons={pokemons} />
  );
}
