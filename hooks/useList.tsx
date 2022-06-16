import { useStore } from './useStore'
import { useEffect } from 'react'
import browser from 'webextension-polyfill'

export const useList = () => {
  const { list, addLink, currentTabId } = useStore()

  useEffect(() => {
    if (currentTabId) {
      browser.tabs.sendMessage(currentTabId, {
        list,
        id: 'onChangeList',
      })
    }
  }, [list, currentTabId])

  return {
    list,
    addLink,
  }
}
