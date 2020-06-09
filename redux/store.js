import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { useMemo } from 'react'
import { composeWithDevTools } from 'redux-devtools-extension'
import entityReducer from './entities/entiryReducer'
import {  createWrapper } from 'next-redux-wrapper'


export const initStoreReducer = context => {
  console.log('make')
  return createStore(
    combineReducers({
      entity: entityReducer
      // router: routerReducer,
      // music: musidReducer
    }),
    composeWithDevTools(applyMiddleware(thunk))
  )
} // export default store

export const wrapper = createWrapper(initStoreReducer)

let store
export const initializeStore = preloadedState => {
  console.log('preloaded', preloadedState)
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

