import { useStore } from './useStore'
import type { IList } from './useStore/slices/list'
import { useEffect } from 'react'
import browser from 'webextension-polyfill'

export const useList = (): {
  list: IList['list']
  addLink: IList['addLink']
} => {
  const { list, addLink, currentTabId } = useStore()

  useEffect(() => {
    if (currentTabId) {
      void browser.tabs.sendMessage(currentTabId, {
        list,
        id: 'onChangeListFromPopup',
      })
    }
  }, [list, currentTabId])

  return {
    list,
    addLink,
  }
}
