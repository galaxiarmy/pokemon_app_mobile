import {configureStore} from '@reduxjs/toolkit';
import getPokemonSlice from './pokemonSlice';

const store = configureStore({
  reducer: {
    pokemon: getPokemonSlice,
  },
});

export default store;
