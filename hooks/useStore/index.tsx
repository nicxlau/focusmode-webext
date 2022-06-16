import type { IFocusState } from './slices/focus'
import { createFocusSlice } from './slices/focus'
import type { IList } from './slices/list'
import { createListSlice } from './slices/list'
import { Storage } from '@plasmohq/storage'
// import { localStorage } from 'redux-persist-webextension-storage'
import type { GetState, SetState } from 'zustand'
import create from 'zustand'
import { persist, StateStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export const plasmoStorage = new Storage('local')

type StoreState = IFocusState & IList

export type StoreSlice<T> = (
  set: SetState<StoreState>,
  get: GetState<StoreState>
) => T

// Custom storage object
const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await plasmoStorage.get(name)) || null
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await plasmoStorage.set(name, value)
  },
  removeItem: async (name: string): Promise<void> => {
    await plasmoStorage.remove(name)
  },
}

export const useStore = create<StoreState>()(
  persist(
    immer((set, get) => ({
      ...createListSlice(set, get),
      ...createFocusSlice(set, get),
    })),
    {
      name: 'focusmode',
      getStorage() {
        return storage
      },
    }
  )
)
