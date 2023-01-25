const { Router } = require('express');
const router = Router();
const {Pokemon, Type} = require('../db')
const { getAllPokemon, detailPokemon, pokemonCreated, infoPokemons} = require('../controllers/index');

router.get('/', async (req, res) => {
   const {name} = req.query;
    const allPokesName = await getAllPokemon();
   try {
        if (name) {
            let poke = allPokesName.filter(e => e.name.toLowerCase() === name.toLowerCase());
            poke.length ? res.status(200).send(poke) : res.status(404).send('Pokemon not found'); 
        } else {
            res.status(200).send(allPokesName);
        }
        
    } catch (error) {
        console.error("No se pudo subir los datos a la ruta", error)
        
        
    } 
});


router.get('/:id', async (req, res) => {
    const {id} = req.params;
    let allPokesId = await pokemonCreated(id); 
    try {
        if(allPokesId) {
            res.status(200).send(allPokesId) 
        } else {
            res.status(404).send('Pokemon not found')
        };    
    } catch (e) {
        console.log("Error de sintaxis: ", e);
    }
});

router.post('/', async (req, res) => {
    const {name, hp, attack, defense, speed, height, weight, image, types} = req.body;
    try {
        if(name) {
            const allPoke = await getAllPokemon();
            const isPoke = allPoke.find(e => e.name === name.toLocaleLowerCase());
            if (!isPoke) {
                const pokemon = await Pokemon.create({
                        name,
                        hp,
                        attack,
                        defense,
                        speed,
                        height,
                        weight,
                        image,
                });
            
                const typeDb = await Type.findAll({
                    where: {
                        name: types,
                    }
                })
                
               pokemon.addType(typeDb);
               res.status(200).send(pokemon);
            } else {
                res.status(404).send("ya existe")
            }
        } 
} catch (error) {
    console.error("error en la ruta /POST : ", error);
}
  
});




module.exports = router;