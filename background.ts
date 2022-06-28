import browser from 'webextension-polyfill'
import { baseURLRegex } from '~constants/regex'

const contentScriptPort: browser.Runtime.Port[] = []

console.log('port', contentScriptPort)

browser.runtime.onConnect.addListener(async (port) => {
  console.log('port number', port)

  if (!contentScriptPort.includes(port)) {
    contentScriptPort.push(port)
  }

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

      contentScriptPort.forEach((item) => {
        item.postMessage({ list, isActive })
      })
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
