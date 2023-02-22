import {
    GET_ALL_POKEMONS,
    GET_POKEMON_NAME,
    FILTER_BY_TYPE,
    ORDER_BY,
    ORDER_BY_TYPE,
    POKEMON_DETAILS,
    POST_POKEMON,
    FILTER_ORIGEN,
    CLEAN_DETAILS
} from '../action/index'


const initialState = {
    allpokemons: [],
    showPokemons: [],
    typePokemons: [],
    pokemonsDetails: [],


}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POKEMONS:
            return {
                ...state,
                allpokemons: action.payload,
                showPokemons: action.payload
            }
        case GET_POKEMON_NAME:

            return {
                ...state,
                allpokemons: action.payload
            }

        case FILTER_BY_TYPE:
            return {
                ...state,
                typePokemons: action.payload
            }
        case ORDER_BY:
            let vgCopy = [...state.showPokemons];
            let ordenamiento

            switch (action.payload) {
                case 'all':
                    ordenamiento = state.showPokemons;
                    break;
                case 'asc':
                    ordenamiento = vgCopy.sort(function (a, b) {
                        if (a.name.toLowerCase() > b.name.toLowerCase()) {
                            return 1
                        }
                        if (a.name.toLowerCase() < b.name.toLowerCase()) {
                            return -1
                        }
                        return 0;
                    });
                    break;
                case 'desc':
                    ordenamiento = vgCopy.sort(function (a, b) {
                        if (a.name.toLowerCase() < b.name.toLowerCase()) {
                            return 1;
                        }
                        if (a.name.toLowerCase() > b.name.toLowerCase()) {
                            return -1;
                        }
                        return 0;
                    });
                    break;
                case 'asc-attack':
                    ordenamiento = vgCopy.sort(function (a, b) {
                        return a.attack - b.attack
                    })
                    break;
                case 'desc-attack':
                    ordenamiento = vgCopy.sort(function (a, b) {
                        return b.attack - a.attack
                    })
                    break;
                default:
                    ordenamiento = vgCopy
                    break;
            }
            return {
                ...state,
                allpokemons: ordenamiento,

            }

        case ORDER_BY_TYPE:
            let show = state.showPokemons;
            let typeFiltered = action.payload === 'all' ? show : show.filter(e => e.types.some(e => e.name === action.payload));

            return {
                ...state,
                allpokemons: typeFiltered,
            }

        case POKEMON_DETAILS:
            return {
                ...state,
                pokemonsDetails: action.payload
            }

        case POST_POKEMON:
            return {
                ...state,
            }

        case FILTER_ORIGEN:
            const pokemons = state.showPokemons;
            const filterByorigen = action.payload === "all"
                ? pokemons
                : action.payload === 'api'
                    ? pokemons.filter(el => typeof (el.id) === 'number')
                    : pokemons.filter(el => isNaN(el.id))
            return {
                ...state,
                allpokemons: filterByorigen
            }

        case CLEAN_DETAILS: {
            return {
                ...state,
                pokemonsDetails: action.payload,
            }
        }

        default: return state
    }
}

export default rootReducer;