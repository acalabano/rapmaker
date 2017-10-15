import {List} from 'immutable'
import datamuse from 'datamuse'

export const GET_RHYMES_DATA= 'GET_RHYMES_DATA'
export const getRhymesData= (data) => ({
  type: GET_RHYMES_DATA,
  data
})
export const getRhymes = (word) => {
  return dispatch => {
    datamuse.request('/words?rel_rhy=' + word)
    .then((json) => {
      dispatch(getRhymesData(json))
    })
  }
}

// -- // -- // State // -- // -- //

const initial = {
  words: []
}
// -- // -- // Reducer // -- // -- //

const wordsReducer = (state = initial, action) => {
  switch (action.type) {
  case GET_RHYMES_DATA:
    return {...state,
      words: action.data
    }
  }
  return state
}

export default wordsReducer
