import { $CombinedState } from '@reduxjs/toolkit'
import Store, { RootState } from './index'

export const getFromLocalStorage = (key: string) => {
  try {
    const value = localStorage.getItem(key)
    return value && JSON.parse(value)
  } catch (e) {
    console.error(`Cannot get '${key}' from localStorage. ${e}`)
    return undefined
  }
}

type storeSlices = keyof Omit<RootState, typeof $CombinedState>

export const saveStore = (store: typeof Store, slices?: storeSlices[]) => {
  const state = store.getState()
  ;(slices ?? Object.keys(state) as storeSlices[])
    .forEach((slice) => {
      try {
        localStorage.setItem(
          slice,
          JSON.stringify(state[slice]))
      } catch (e) {
        console.error(`Cannot save '${slice}'' to localStorage. ${e}`)
      }
    })
}
