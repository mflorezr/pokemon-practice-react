export const UPDATE_POKEMON = 'UPDATE_POKEMON'
export const RESTART_POKEMON = 'RESTART_POKEMON'

export const updatePokemon= (id) => ({
  type: UPDATE_POKEMON,
  payload: {
    id
  }
})

export const restartPokemon= () => ({
  type: RESTART_POKEMON
})