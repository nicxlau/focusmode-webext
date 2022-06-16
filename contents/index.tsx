import cssText from 'data-text:~/styles.css'
import type { PlasmoContentScript } from 'plasmo'
import { useEffect } from 'react'
import browser from 'webextension-polyfill'
import { useFocusMode } from '~hooks/useFocusMode'
import { useStore } from '~hooks/useStore'

export const config: PlasmoContentScript = {
  matches: ['http://*/*', 'https://*/*'],
}

export const getStyle = () => {
  const style = document.createElement('style')
  style.textContent = cssText
  return style
}

const Content = () => {
  const { setActive, initList, list } = useStore()

  const { isFocusModeOn } = useFocusMode()

  console.log('isFocusModeOn', isFocusModeOn)

  useEffect(() => {
    // from background
    let contentScriptPort = browser.runtime.connect()

    contentScriptPort.onMessage.addListener((message) => {
      const { list, isActive } = message
      setActive(isActive)
      initList(list)
    })

    // from popup
    browser.runtime.onMessage.addListener(function (request) {
      const onToggleFromPopup = request?.id === 'onToggleFromPopup'
      const onChangeListFromPopup = request?.id === 'onChangeListFromPopup'

      if (onToggleFromPopup) {
        setActive(request.isActive)
      } else if (onChangeListFromPopup) {
        initList(request.list)
      }
    })
  }, [])

  console.log('list', list)

  return (
    isFocusModeOn && (
      <span
        className="bg-indigo-500"
        style={{
          padding: 12,
        }}
      >
        Focus mode is ON
      </span>
    )
  )
}

export default Content
