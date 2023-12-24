// src/redux/actions.js
export const setPokemons = (pokemons) => ({
    type: 'SET_POKEMONS',
    payload: pokemons,
  });
  
  export const setSelectedPokemon = (pokemon) => ({
    type: 'SET_SELECTED_POKEMON',
    payload: pokemon,
  });
  