import React, { useState, useEffect } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  addPokemonFavoriteApi,
  getPokemonFavoriteApi,
  removePokemonFavoriteApi,
} from "../../api/favorite";

export default function Favorite(props) {
  //Pokemon exist in favorite?
  const [isFavorite, setIsFavorite] = useState(undefined);
  //get pokemon id to props
  const { id } = props;
  ////Heart solid?
  const Icon = isFavorite ? FontAwesome : FontAwesome5;
  const [reloadCheck, setReloadCheck] = useState(false)


  const removeFavorite = async () => {
    try {
      await removePokemonFavoriteApi(id)
      onReloadCheckFavorite();
    } catch (error) {
      throw error;
    }
  };

  //Add favorite pokemon to local storage
  const addFavorite = async () => {
    console.log(id);
    await addPokemonFavoriteApi(id);
    
    onReloadCheckFavorite()
  };

  

  useEffect(() => {
    (async () => {
        const data = await getPokemonFavoriteApi()
        data.includes(id)
        ? setIsFavorite(true)
        : setIsFavorite(false);
        console.log("cargo")
    })();
  }, [id, reloadCheck]);

  //Si apreto el corazon, recargo ejecuto el useEffect para recargar el corazon.
  const onReloadCheckFavorite = () => {
    setReloadCheck(!reloadCheck)
  }
 
  return (
    <Icon name="heart" color="#fff" size={20} onPress={isFavorite ? removeFavorite : addFavorite} />
  );
}
