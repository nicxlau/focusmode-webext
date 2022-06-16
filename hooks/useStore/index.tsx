import type { IFocusState } from './slices/focus'
import { createFocusSlice } from './slices/focus'
import type { IList } from './slices/list'
import { createListSlice } from './slices/list'
import type { SetState, GetState } from 'zustand'
import create from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type StoreState = IFocusState & IList

export type StoreSlice<T> = (
  set: SetState<StoreState>,
  get: GetState<StoreState>
) => T

export const useStore = create<StoreState>()(
  persist(
    immer((set, get) => ({
      ...createListSlice(set, get),
      ...createFocusSlice(set, get),
    })),
    {
      name: 'focusmode',
    }
  )
)
