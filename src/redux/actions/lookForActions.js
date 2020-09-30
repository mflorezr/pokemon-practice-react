export const LOOK_FOR = 'LOOK_FOR'

export const lookFor= (pokemonResults) => ({
  type: LOOK_FOR,
  payload: {
    pokemonResults
  }
})