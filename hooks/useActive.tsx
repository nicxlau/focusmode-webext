import { useStore } from './useStore'
import { useEffect } from 'react'
import browser from 'webextension-polyfill'

export const useActive = ({ shouldSync = false }) => {
  const { active, setActive, currentTabId } = useStore()

  // Syncing with storage after data changed
  useEffect(() => {
    if (currentTabId && browser && browser.tabs && browser.runtime?.id) {
      browser.tabs.sendMessage(currentTabId, {
        active,
        id: 'onToggle',
      })
    }
  }, [active])

  return {
    active,
    setActive,
  }
}
