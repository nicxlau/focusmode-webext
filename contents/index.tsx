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
      <dialog
        open
        className="font-sans fixed z-50 top-0 left-0 right-0 bottom-0 h-screen w-screen bg-black/80 flex justify-center align-middle backdrop-saturate-50 backdrop-blur-sm"
      >
        <div className="absolute top-[200px] w-[460] m-h-[208px] rounded-md bg-[#111827]/100">
          <div className="text-white p-4">Focus mode is on</div>
          <div className="mt-3 mb-8 text-white px-4">
            Distracting websites are now blocked
          </div>
          <div className="flex flex-col justify-center mt-4 text-white ">
            <button className="p-2 w-full py-3 hover:bg-slate-800 transition-all">
              OK
            </button>
            <button className="p-2 w-full py-3 hover:bg-slate-800 transition-all">
              Take a 5 minutes break
            </button>
          </div>
        </div>
      </dialog>
    )
  )
}

export default Content
