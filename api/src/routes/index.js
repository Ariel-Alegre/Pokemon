const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const pokemonsRouters = require('./pokemons');
const typesPokemonRouters = require('./types');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', pokemonsRouters );
router.use('/types', typesPokemonRouters )


module.exports = router;
