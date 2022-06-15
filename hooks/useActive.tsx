import { useStore } from './useStore'
import { useEffect } from 'react'
import browser from 'webextension-polyfill'

export const useActive = ({ shouldSync = false }) => {
  const { active, setActive, currentTabId } = useStore()

  // Syncing with storage after data changed
  useEffect(() => {
    if (shouldSync) {
      browser.storage.local.set({ active })
      if (currentTabId && browser && browser.tabs && browser.runtime?.id) {
        browser.tabs.sendMessage(currentTabId, {
          active,
          id: 'onToggle',
        })
      }
    }
  }, [active, shouldSync, currentTabId, browser])

  return {
    active,
    setActive,
  }
}
