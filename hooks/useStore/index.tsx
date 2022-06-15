import type { SetState, GetState } from 'zustand'
import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'
import type { IList } from './list'
import { createListSlice } from './list'
import type { IFocusState } from './focus'
import { createFocusSlice } from './focus'

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
