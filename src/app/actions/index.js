export const SET_INITIAL_ZOOM = 'SET_INITIAL_ZOOM'
export const ZOOM_IN = 'ZOOM_IN'
export const ZOOM_OUT = 'ZOOM_OUT'

export const setInitialZoom = level => ({
  type: SET_INITIAL_ZOOM,
  payload: { level },
})

export const zoomIn = () => ({
  type: ZOOM_IN,
})

export const zoomOut = () => ({
  type: ZOOM_OUT,
})
