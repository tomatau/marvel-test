import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { SET_INITIAL_ZOOM, ZOOM_IN, ZOOM_OUT } from 'app/actions'

const initialState = {
  zoomLevel: 0,
  modifier: 100,
}

export default combineReducers({
  routing: routerReducer,
  displayImage: (state=initialState, action) => {
    switch (action.type) {
      case SET_INITIAL_ZOOM:
        return {
          ...state,
          zoomLevel: action.payload.level,
        }
      case ZOOM_IN:
        return {
          ...state,
          modifier: state.modifier += 5,
        }
      case ZOOM_OUT:
        return {
          ...state,
          modifier: state.modifier -= 5,
        }
      default: return state
    }
  },
})
