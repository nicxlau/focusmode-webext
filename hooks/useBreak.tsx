import { useStore } from './useStore'
import type { IBreakState } from './useStore/slices/break'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useEffect } from 'react'
import browser from 'webextension-polyfill'

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
dayjs.extend(relativeTime)

export const useBreak = (): IBreakState => {
  const { setBreak, isBreak, currentTabId, breakDuration } = useStore()

  // Syncing with storage after data changed
  useEffect(() => {
    void browser.storage.local.set({ isBreak })

    if (currentTabId) {
      void browser.tabs.sendMessage(currentTabId, {
        isBreak,
        id: 'onBreak',
      })
    }
  }, [isBreak, currentTabId])

  return {
    setBreak,
    isBreak,
    breakDuration,
  }
}
