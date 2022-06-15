import type { StoreSlice } from '.'
import browser from 'webextension-polyfill'

export interface IFocusState {
  active: boolean
  setActive: (active: boolean) => void
  currentTabId: number | undefined
  setCurrentTabId: (tabId: number) => void
  getCurrentTabId: () => void
}

export const createFocusSlice: StoreSlice<IFocusState> = (set) => ({
  active: false,
  currentTabId: undefined,
  setActive: (active): void => {
    set(() => ({ active }))
  },
  getCurrentTabId: async () => {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true })

    set({ currentTabId: tabs[0].id })
  },
  setCurrentTabId: (tabId) => {
    set({ currentTabId: tabId })
  },
})
