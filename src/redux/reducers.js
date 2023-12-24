// src/redux/reducers.js
import { combineReducers } from 'redux';
import pokemonReducer from './pokemonReducer';

const rootReducer = combineReducers({
  pokemon: pokemonReducer,
});

export default rootReducer;
