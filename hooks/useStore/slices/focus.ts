import type { StoreSlice } from '..'
import browser from 'webextension-polyfill'

export interface IFocusState {
  isActive: boolean
  setActive: (isActive: boolean) => void
  currentTabId: number | undefined
  setCurrentTabId: (tabId: number) => void
  getCurrentTabId: () => void
}

export const createFocusSlice: StoreSlice<IFocusState> = (set) => ({
  isActive: false,
  currentTabId: undefined,
  setActive: (isActive): void => {
    set(() => ({ isActive }))
  },
  getCurrentTabId: async () => {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true })

    set({ currentTabId: tabs[0].id })
  },
  setCurrentTabId: (tabId) => {
    set({ currentTabId: tabId })
  },
})
