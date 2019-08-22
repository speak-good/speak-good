import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_RECORDING = 'GET_ALL_RECORDING'
const GET_RECORDING = 'GET_RECORDING'

/**
 * INITIAL STATE
 */
const initialState = {
  allRecording: [],
  singleRecording: {}
}

/**
 * ACTION CREATORS
 */
const getAllRecording = recordingList => ({
  type: GET_ALL_RECORDING,
  recordingList
})
const getSingleRecording = singleRecording => ({
  type: GET_RECORDING,
  singleRecording
})

/**
 * THUNK CREATORS
 */
export const fetchRecordings = () => async dispatch => {
  try {
    const res = await axios.get('/api/recordings')
    dispatch(getAllRecording(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchSingleRecording = id => async dispatch => {
  try {
    const res = await axios.get(`/api/recordings/${id}`)
    dispatch(getSingleRecording(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_RECORDING:
      return {...state, allRecording: action.recordingList}
    case GET_RECORDING:
      return {...state, singleRecording: action.singleRecording}
    default:
      return state
  }
}
