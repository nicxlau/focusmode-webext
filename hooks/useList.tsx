import { useStore } from './useStore'
import { useEffect } from 'react'
import browser from 'webextension-polyfill'

export const useList = ({ shouldSync }: { shouldSync: boolean }) => {
  const { list, addLink } = useStore()

  // Syncing with storage after data changed from DOM
  useEffect(() => {
    if (shouldSync) {
      browser.storage.local.set({ list })
      if (browser && browser.tabs && browser.runtime?.id) {
      }
    }
  }, [list, shouldSync, browser])

  return {
    list,
    addLink,
  }
}
