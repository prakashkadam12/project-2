// src/redux/pokemonReducer.js
const initialState = {
    pokemons: [],
    selectedPokemon: null,
  };
  
  const pokemonReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_POKEMONS':
        return { ...state, pokemons: action.payload };
      case 'SET_SELECTED_POKEMON':
        return { ...state, selectedPokemon: action.payload };
      default:
        return state;
    }
  };
  
  export default pokemonReducer;
  