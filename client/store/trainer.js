//Constants
const GET_RESULT = 'GET_RESULT'
const STOP = 'STOP'
const RESET = 'RESET'

//Action creators
export const gotResult = (result, score) => ({
  type: GET_RESULT,
  result,
  score
})

export const updateStop = () => ({
  type: STOP,
  stop: true
})

export const reset = () => ({
  type: RESET
})

//Initial state
let initialState = {
  pose: '',
  score: 0,
  stop: false
}

//Reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_RESULT:
      return {pose: action.result, score: action.score, stop: false}
    case STOP:
      return {...state, stop: true}
    case RESET:
      return initialState
    default:
      return state
  }
}
