import axios from 'axios';


export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_POKEMON_NAME = "GET_POKEMON_NAME";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const ORDER_BY = "ORDER_BY";
export const ORDER_BY_TYPE = "ORDER_BY_TYPE";
export const POKEMON_DETAILS = "POKEMON_DETAILS";
export const POST_POKEMON = "POST_POKEMON";
export const FILTER_ORIGEN = "FILTER_ORIGEN";
export const CLEAN_DETAILS = "CLEAN_DETAILS";





export const getallPokemon = () => {

    return async (dispatch) => {
        const res = await axios.get('http://localhost:3001/pokemons');
        const data = res.data
        return dispatch({
            type: GET_ALL_POKEMONS,
            payload: data
        })
    }


};


export const getPokemonName = (name) => {
    return async (dispatch) => {
        const url = `http://localhost:3001/pokemons?name=${name}`
        const res = await axios.get(url);
        const data = res.data;
        return dispatch({
            type: GET_POKEMON_NAME,
            payload: data
        })
    }
};


export const postPokemon = (payload) => {
    return async (dispatch) => {
        const res = await axios.post("http://localhost:3001/pokemons/", payload)
        const data = res.data;

        return dispatch({
            type: POST_POKEMON,
            payload: data
        })
    }
}


export const filterByType = () => {

    return async (dispatch) => {
        const { data } = await axios.get('http://localhost:3001/types');

        return dispatch({
            type: FILTER_BY_TYPE,
            payload: data
        })
    }

}

export const orderBy = (payload) => {
    return {
        type: ORDER_BY,
        payload,
    }
};

export const orderBytype = (payload) => {
    return {
        type: ORDER_BY_TYPE,
        payload,
    }
};

export const getPokemonDetail = (id) => {
    return async (dispatch) => {
        const res = await axios.get(`http://localhost:3001/pokemons/${id}`);
        const data = res.data;

        return dispatch({
            type: POKEMON_DETAILS,
            payload: data
        })
    }
};

export const filterByorigen = (payload) => {
    return {
        type: FILTER_ORIGEN,
        payload,
    }
};

export const cleanDetail = () => {
    return {
        type: CLEAN_DETAILS,
        payload: []
    }
}



