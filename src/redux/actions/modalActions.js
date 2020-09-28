export const UPDATE_POKEMON = 'UPDATE_POKEMON'

export const updatePokemon= (id) => ({
  type: UPDATE_POKEMON,
  payload: {
    id
  }
})