import AsyncStorage from "@react-native-async-storage/async-storage";
import { FAVORITE_STORAGE } from "../utils/constants";

//Get pokemon to AsyncStorage
export async function getPokemonFavoriteApi () {
    try {
        //return respons in array, with data or not
        const response = await AsyncStorage.getItem("FAVORITE_STORAGE")
        return JSON.parse(response || '[]');
    } catch (error) {
        throw error
    }
}

//Add pokemon to favorite
export async function addPokemonFavoriteApi (id) {
    try {
        //Get favorte pokemons
        const favorites = await getPokemonFavoriteApi()
        //Exist pokemon in favorites? 
        !favorites.includes(id) ? favorites.push(id) : ""
        //save data
        await AsyncStorage.setItem("FAVORITE_STORAGE", JSON.stringify(favorites))
    } catch (error) {
        throw error;
    }
}

export async function removePokemonFavoriteApi (id) {
    try {
        const favorite = await getPokemonFavoriteApi()
        const newFavorites = favorite.filter( fav => fav != id );
        await AsyncStorage.setItem("FAVORITE_STORAGE", JSON.stringify(newFavorites))
    } catch (error) {
        throw error
    }
}

