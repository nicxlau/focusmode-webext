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
  const { setActive, isActive } = useStore()

  const { isFocusModeOn } = useFocusMode()

  console.log('isFocusModeOn', isFocusModeOn)

  useEffect(() => {
    browser.runtime.onMessage.addListener(function (request) {
      if (request && request.id === 'onToggle') {
        setActive(request.isActive)
      }
    })
  }, [])

  console.log('actisActiveive', isActive)

  return (
    <span
      className="bg-indigo-500"
      style={{
        padding: 12,
      }}
    >
      HELLO WORLDs TOP
    </span>
  )
}

export default Content
