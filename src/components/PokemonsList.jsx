import { FlatList, StyleSheet, ActivityIndicator, Platform } from "react-native";
import React from "react";
import PokemonCard from "./PokemonCard";

export default function PokemonsList(props) {
  //Obtengo los pokemons de las props
  const { pokemons, loadPokemons, isNext } = props;

  const loadMore = () => {
    loadPokemons();
  };

  return (
    <FlatList
      // Especifico la informacion que va a manejar.
      data={pokemons}
      //Cuantas columnas vamos a querer mostrar.
      numColumns={2}
      //DEsactivamos que se vea un scroll cuando bajamos
      showsVerticalScrollIndicator={false}
      //Cada elemnto debe de tener una key unica.
      keyExtractor={(pokemon) => String(pokemon.id)}
      //Aca indicamos que queremos renderizar por cada elemento.
      renderItem={({ item }) => <PokemonCard pokemon={item} />}
      //Aca le especificamos los estilos que estamos utilizando.
      contentContainerStyle={styles.flatListContentContainer}
      //Cuando llegue al final de la lista, que cargue mas.
      onEndReached={isNext && loadMore}
      //Especificamos que sea un poco antes de que llegue al final, para que no haya un paron en la app.
      onEndReachedThreshold={0.1}
      //Renderizamos un spinner, solo si hay mas informacion.
      ListFooterComponent={
        isNext && (
          <ActivityIndicator
            size="large"
            style={styles.spinner}
            color="#AEAEAE"
          />
        )
      }
    ></FlatList>
  );
}

//Creo estilos para que quede de una forma mas ordenada.
const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 5,
  },
  spinner: {
    marginTop: 2,
    marginBottom: 60,
  },
});
