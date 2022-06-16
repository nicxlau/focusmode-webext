import { useStore } from './useStore'
import { useEffect } from 'react'
import browser from 'webextension-polyfill'

export const useActive = () => {
  const { active, setActive, currentTabId } = useStore()

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
