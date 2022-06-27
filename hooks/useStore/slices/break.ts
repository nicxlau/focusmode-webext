import type { StoreSlice } from '..'

const breakDuration = 5

export interface IBreakState {
  isBreak: boolean
  setBreak: (isBreak: boolean) => void
  breakDuration: number
  currentInterval: number
}

export const createBreakSlice: StoreSlice<IBreakState> = (set) => ({
  isBreak: false,
  breakDuration,
  setBreak: (isBreak): void => {
    set(() => ({ isBreak }))
  },
  currentInterval: 0,
})
