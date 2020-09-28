export const COMPARE_WITH = 'COMPARE_WITH'
export const RESTART = 'RESTART'

export const compareTo= (id) => ({
  type: COMPARE_WITH,
  payload: {
    id
  }
})

export const restartComparison= () => ({
  type: RESTART
})