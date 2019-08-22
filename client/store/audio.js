import axios from 'axios'
import * as methods from 'react-speech-recognition'
// import transcript from SpeechRecognition

/**
 * ACTION TYPES
 */
const GET_ALL_AUDIO = 'GET_ALL_AUDIO'
const GET_AUDIO = 'GET_AUDIO'

/**
 * INITIAL STATE
 */
const initialState = {
  audio: [],
  singleAudio: {},
  methods
}

/**
 * ACTION CREATORS
 */
const getAllAudio = audioList => ({
  type: GET_ALL_AUDIO,
  audioList
})
const getAudio = singleAudio => ({
  type: GET_AUDIO,
  singleAudio
})

/**
 * THUNK CREATORS
 */
export const fetchAudio = () => async dispatch => {
  try {
    const res = await axios.get('/api/audio')
    dispatch(getAllAudio(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchSingleAudio = id => async dispatch => {
  try {
    const res = await axios.get(`/api/audio/${id}`)
    dispatch(getAudio(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_AUDIO:
      return {...state, audio: action.audioList}
    case GET_AUDIO:
      return {...state, singleAudio: action.singleAudio}
    default:
      return state
  }
}
