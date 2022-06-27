/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import browser from 'webextension-polyfill'
import { baseURLRegex } from '~constants/regex'

let contentScriptPort

browser.runtime.onConnect.addListener(async (port) => {
  contentScriptPort = port

  const tabs = await browser.tabs.query({ currentWindow: true, active: true })

  const currentURL = tabs[0]?.url

  if (currentURL) {
    const [baseURL] = currentURL.match(baseURLRegex) ?? []

    if (baseURL) {
      const { focusmode } = await browser.storage.local.get()

      const localStorage = JSON.parse(JSON.parse(focusmode))

      const {
        state: { list, isActive },
      } = localStorage

      // eslint-disable-next-line unicorn/require-post-message-target-origin
      contentScriptPort.postMessage({ list, isActive })
    }
  }
})

browser.tabs.onActivated.addListener(async (activeInfo) => {
  const currentTabs = await browser.tabs.query({
    currentWindow: true,
    active: true,
  })

  const currentURL = currentTabs[0]?.url

  if (currentURL) {
    const [baseURL] = currentURL.match(baseURLRegex) ?? []

    if (baseURL) {
      const { focusmode } = await browser.storage.local.get()

      const localStorage = JSON.parse(JSON.parse(focusmode))

      const {
        state: { list, isActive },
      } = localStorage

      await browser.tabs.sendMessage(activeInfo.tabId, {
        isActive,
        list,
        id: 'onTabActivated',
        tabId: activeInfo.tabId,
      })
    }
  }
})
