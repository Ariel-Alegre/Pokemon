const { Pokemon, Type } = require('../db');
const axios = require('axios');


const infoPokemons = async () => {
    const pokemons = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=100');
    const mapUrl = await pokemons.data.results.map(e => { return e.url })
    var arrayPokemones = [];
    for (let i = 0; i < mapUrl.length; i++) {
        let url = await axios.get(mapUrl[i])
        arrayPokemones.push({
            id: url.data.id,
            name: url.data.name,
            height: url.data.height,
            weight: url.data.weight,
            hp: url.data.stats[0].base_stat,
            attack: url.data.stats[1].base_stat,
            defense: url.data.stats[2].base_stat,
            speed: url.data.stats[5].base_stat,
            types: url.data.types.map(e => e.type),
            image: url.data.sprites.other.home.front_default,
        }
        );
    }
   return arrayPokemones ;
};






const dbPokemons = async () => {
    return await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
}

const getAllPokemon = async () => {
    const apiInfo = await infoPokemons();
    const dbInfo = await dbPokemons();
    const allPokemon = apiInfo.concat(dbInfo);
    return allPokemon;
};

const detailPokemon = async (id) => {
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.data
        const details = {
            id: data.id,
            name: data.name.toUpperCase(),
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            speed: data.stats[5].base_stat,
            height: data.height,
            weight: data.weight,
            image: data.sprites.other.home.front_default,
            types: data.types.map(info => info.type)

        }
        return details
    } catch (error) {
        console.error("No se pudo capturar correctamente los detalles del pokemon", error);

    }

};


const idDb = async (id) => {
    try {
        return await Pokemon.findByPk(id, {
            include: [{
                model: Type,
                attributes: ['name'],
                throught: {
                    attributes: []
                }
            }]
        })

    } catch (error) {
        console.log(error)
    }
};


//uno mis 2 solicitudes
const pokemonCreated = async (id) => {
    const dbId = id.includes("-");
    if (dbId) {
        const infodb = await idDb(id);
        return infodb;
    } else {
        const infoApi = await detailPokemon(id);
        return infoApi;
    }
};




module.exports = {
    infoPokemons,
    getAllPokemon,
    detailPokemon,
    dbPokemons,
    pokemonCreated
}