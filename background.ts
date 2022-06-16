import browser from 'webextension-polyfill'
import { baseURLRegex } from '~constants/regex'

let contentScriptPort

browser.runtime.onConnect.addListener(async (port) => {
  contentScriptPort = port

  const tabs = await browser.tabs.query({ currentWindow: true, active: true })

  const currentURL = tabs[0].url

  const [baseURL] = currentURL!.match(baseURLRegex) ?? []

  if (baseURL) {
    const {
      state: { list, isActive },
    } = await browser.storage.local.get('focusmode')

    contentScriptPort.postMessage({ list, isActive })

    console.log({ list, isActive })
  }
})
