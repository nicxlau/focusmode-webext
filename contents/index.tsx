import cssText from 'data-text:~/styles.css'
import type { PlasmoContentScript } from 'plasmo'
import { useEffect } from 'react'
import browser from 'webextension-polyfill'
import { useStore } from '~hooks/useStore'

export const config: PlasmoContentScript = {
  matches: ['http://*/*', 'https://*/*'],
}

// Idea for an UI API, for popup, notification badge, or mounting UI
// Idea for static mount
// Idea for styling injection support (inline or with custom emotion cache)

export const getStyle = () => {
  const style = document.createElement('style')
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  const { setActive, active } = useStore()

  useEffect(() => {
    browser.runtime.onMessage.addListener(function (request) {
      console.log('hehehe', request)
      if (request && request.id === 'onToggle') {
        setActive(request.active)
      }
    })
  }, [])

  console.log('active', active)

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

export default PlasmoOverlay
