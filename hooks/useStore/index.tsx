import { createBreakSlice } from './slices/break'
import type { IBreakState } from './slices/break'
import type { IFocusState } from './slices/focus'
import { createFocusSlice } from './slices/focus'
import type { IList } from './slices/list'
import { createListSlice } from './slices/list'
import { Storage } from '@plasmohq/storage'
import type { GetState, SetState } from 'zustand'
import create from 'zustand'
import type { StateStorage } from 'zustand/middleware'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type StoreState = IBreakState & IFocusState & IList

const plasmoStorage = new Storage('local')

// Custom storage object
const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return (await plasmoStorage.get(name)) || null
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await plasmoStorage.set(name, value)
  },
  removeItem: async (name: string): Promise<void> => {
    await plasmoStorage.remove(name)
  },
}

type StoreSlice<T> = (set: SetState<StoreState>, get: GetState<StoreState>) => T

const useStore = create<StoreState>()(
  persist(
    immer((set, get) => ({
      ...createListSlice(set, get),
      ...createFocusSlice(set, get),
      ...createBreakSlice(set, get),
    })),
    {
      name: 'focusmode',
      getStorage: () => {
        return storage
      },
    }
  )
)

export type { StoreSlice }
export { plasmoStorage, useStore }
