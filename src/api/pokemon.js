import { API_HOST } from '../utils/constants'

//Function que trae todos los pokemons
export async function getPokemonApi ( endpointUrl) {
    try {
        //URL que traiga 20 pokemon, y que empieze por el 0. 
        const url = `${API_HOST}/pokemon?limit=20&offset=0`
        //Hacemos la peticion
        const response = await fetch(endpointUrl || url);
        //Le damos formato json
        const result = await response.json();
        //Devolvemos la informacion formateada.
        return result
    } catch (error) {
        throw error;
    }
}

//Function que trae informacion acerca de uno en especifico.
export async function getPokemonDetailsByUrlApi(url) {
    try {
      const response = await fetch(url);
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }

  export async function getPokemonDetailsApi (id) {
    try {
      //url para hacer la peticion
      const url = `${API_HOST}/pokemon/${id}`
      //Hacemos un fetch a la url
      const response = await fetch (url);
      //Convertimos el resultado en json
      const result =  await response.json();
      //Devolvemos el result
      return result;
      
    } catch (error) {
      //Si falla, mandamos el error.
      throw error
    }
  }

  