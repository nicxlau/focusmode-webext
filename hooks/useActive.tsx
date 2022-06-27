import { useStore } from './useStore'
import type { IFocusState } from './useStore/slices/focus'
import { useEffect } from 'react'
import browser from 'webextension-polyfill'

export const useActive = (): {
  isActive: IFocusState['isActive']
  setActive: IFocusState['setActive']
} => {
  const { isActive, setActive, currentTabId } = useStore()

  useEffect(() => {
    if (currentTabId) {
      void browser.tabs.sendMessage(currentTabId, {
        isActive,
        id: 'onToggleFromPopup',
      })
    }
  }, [currentTabId, isActive])

  return {
    isActive,
    setActive,
  }
}
