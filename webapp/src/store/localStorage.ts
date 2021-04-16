import { $CombinedState } from '@reduxjs/toolkit'
import Store, { RootState } from './index'
export const getFromLocalStorage = (key: string) => {
  const value = localStorage.getItem(key)
  return value && JSON.parse(value)
}

type storeKeys = keyof Omit<RootState, typeof $CombinedState>

type localStorageUpdater = 
  (
    key: storeKeys,
    store: typeof Store,
    initialState?: RootState[typeof key]
  ) => () => void

export const createLocalStorageUpdater: localStorageUpdater = 
  (key, store, initialState = store.getState()[key]) => 
    () => {
      const value = store.getState()[key]
      if (value === initialState) return
      localStorage.setItem(key, JSON.stringify(value))
      initialState = value
    }
