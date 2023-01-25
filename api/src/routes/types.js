const { Router } = require('express');
const router = Router();
const { Type } = require('../db')
const axios = require('axios')


router.get('/', async (req, res) => {
    try {
      const infoType = await axios.get('https://pokeapi.co/api/v2/type');
      const nameType = infoType.data.results.map(info => info.name);
      nameType.map(type => {
        Type.findOrCreate({
            where: {
                name: type
            }
        })
      })

      const allTypes = await Type.findAll();
      allTypes
      ? res.status(200).send(allTypes) 
      : res.status(404).send('Type not found');
        
    } catch (error) {
        console.error('Error en la ruta /type', error);
        
    }
   
});








module.exports= router;