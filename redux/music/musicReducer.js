import { HYDRATE } from 'next-redux-wrapper'

const INITIAL_STATE = {
  isPlaying: false,
  itemId: ''
}

const playReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload }

      break
    case 'PLAY':
      return { ...state, isPlaying: true, itemId: action.itemId }
    case 'PAUSE':
      return { ...state, isPlaying: false, itemId: action.itemId }
    default:
      return state
  }
}

export default playReducer
