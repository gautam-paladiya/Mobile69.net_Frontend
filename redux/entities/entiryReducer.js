import { HYDRATE } from 'next-redux-wrapper'

const INITIAL_STATE = {
  items: [],
  error: '',
  isProgress: false,
  isLast: true,
  id: 1,
  navigation: 'all',
  searchTerm: '',
  music: { isPlaying: false, itemId: '' }
}

const entityReducer = (state = INITIAL_STATE, action) => {
  console.info('action ', action)
  console.info('state ', state)
  switch (action.type) {
    case HYDRATE:
      if (action.payload) {
        console.log('set items')
        return { ...state, ...action.payload.entity }
      }
      return state

      break

    case 'SET_ITEMS':
      if (action.payload.isInitial) {
        return {
          ...state,
          items: [...action.payload.items],
          isProgress: false,
          isLast: action.payload.isLast,
          navigation: action.payload.navigation,
          error: ''
        }
      } else {
        return {
          ...state,
          items: [...state.items, ...action.payload.items],
          isProgress: false,
          isLast: action.payload.isLast,
          navigation: action.payload.navigation,
          error: ''
        }
      }
    case 'SET_PROGRESS':
      return { ...state, isProgress: true }
      break

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload.error,
        isProgress: false
      }
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload
      }
    case 'PLAY':
      return {
        ...state,
        music: { isPlaying: true, itemId: action.payload.itemId }
      }
    case 'PAUSE':
      return {
        ...state,
        music: { isPlaying: false, itemId: action.payload.itemId }
      }
    default:
      return state
  }
}

export default entityReducer
