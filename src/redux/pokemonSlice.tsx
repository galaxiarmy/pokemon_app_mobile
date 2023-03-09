/* eslint-disable @typescript-eslint/no-shadow */
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const getPokemon = createAsyncThunk(
  'pokemon/getPokemon',
  async (params, {getState, dispatch}: any) => {
    dispatch(nextPage());
    const {page, data, limit, offset} = getState().pokemon;
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`,
    ).then((data: any) => data.json());

    if (page === 1) {
      return res;
    }
    return {results: data.concat(await res?.results)};
  },
);

export const getAbility = createAsyncThunk(
  'pokemon/getAbility',
  async (url: any) => {
    const res = await fetch(url).then(data => data.json());

    return res;
  },
);

export const pokemon = createSlice({
  name: 'pokemon',
  initialState: {
    data: [],
    page: 0,
    limit: 10,
    offset: 0,
    loading: false,
    error: null,
    ability: {},
  },
  reducers: {
    nextPage: state => {
      // eslint-disable-next-line no-sequences
      (state.page = state.page + 1),
        (state.offset = state.page > 1 ? state.page * state.limit : 0);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getPokemon.pending, state => {
        state.loading = true;
      })
      .addCase(getPokemon.fulfilled, (state, action: any) => {
        state.loading = false;
        state.data = action.payload?.results;
      })
      .addCase(getPokemon.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAbility.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(getAbility.fulfilled, (state, action: any) => {
        state.loading = false;
        state.ability = action.payload;
      });
  },
});

export default pokemon.reducer;

export const {nextPage} = pokemon.actions;
