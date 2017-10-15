import {List} from 'immutable'

// -- // -- // Actions // -- // -- //
export const GET_PIXELS='GET_PIXELS'
export const getPixels = () => ({
  type: GET_PIXELS
})

export const LOAD_PIXEL='LOAD_PIXEL'
export const loadPixel = (pixelId) => ({
  type: LOAD_PIXEL,
  pixelId
})
export const ADD_PIXEL = 'ADD_PIXEL'
export const addPixel = (pixelColor, pixelDay, pixelContent) => ({
  type: ADD_PIXEL,
  pixelColor,
  pixelDay,
  pixelContent
})

export const REMOVE_PIXEL = 'REMOVE_PIXEL'
export const removePixel = (pixelIndex) => ({
  type: REMOVE_PIXEL,
  pixelIndex
})

export const UPDATE_PIXEL = 'UPDATE_PIXEL'
export const updatePixel = (pixelIndex, pixelColor, pixelDay) => ({
  type: UPDATE_PIXEL,
  pixelIndex,
  pixelColor,
  pixelDay,
})

export const SORT_PIXELS = 'SORT_PIXELS'
export const sortPixels = () => ({
  type: SORT_PIXELS
})

// -- // -- // State // -- // -- //

const initial = {
  pixels: List()
}
// -- // -- // Reducer // -- // -- //

const pixelReducer = (state = initial, action) => {
  switch (action.type) {
  case GET_PIXELS:
    return state
  case ADD_PIXEL:
    return {...state,
      pixels: state.pixels.push({
        pixelColor: action.pixelColor,
        pixelDay: action.pixelDay,
        pixelContent: action.pixelContent
      })
    }

  case REMOVE_PIXEL:
    return {...state,
      pixels: state.pixels.delete(action.pixelIndex)
    }

  case UPDATE_PIXEL:
    return {...state,
      pixels: state.pixels.set(action.pixelIndex, {
        ...state.pixels.get(action.pixelIndex),
        pixelColor: action.pixelColor,
        pixelDay: action.pixelDay,
      })
    }
  
  case SORT_PIXELS:
    return {...state,
      pixels: state.pixels.sort((a,b)=> a.pixelDay>b.pixelDay)
    }
  }
  return state
}

export default pixelReducer
