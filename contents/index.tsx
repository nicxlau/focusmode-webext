import cssText from 'data-text:~/styles.css'
import type { PlasmoContentScript } from 'plasmo'
import { useEffect } from 'react'
import browser from 'webextension-polyfill'
import { useFocusMode } from '~hooks/useFocusMode'
import { useStore } from '~hooks/useStore'
import type { IFocusState } from '~hooks/useStore/slices/focus'
import type { LinkType } from '~hooks/useStore/slices/list'

const config: PlasmoContentScript = {
  matches: ['https://*/*', 'https://*/*'],
}

const getStyle = (): HTMLStyleElement => {
  const style = document.createElement('style')

  style.textContent = cssText

  return style
}

const Content = () => {
  const { setActive, initList } = useStore()

  const { isFocusModeOn } = useFocusMode()

  console.log('isFocusModeOn', isFocusModeOn)

  useEffect(() => {
    // from background
    const contentScriptPort = browser.runtime.connect()

    contentScriptPort.onMessage.addListener(
      (message: { list: LinkType[]; isActive: IFocusState['isActive'] }) => {
        const { list, isActive } = message

        setActive(isActive)
        initList(list)
      }
    )

    browser.runtime.onMessage.addListener((request) => {
      const onToggleFromPopup = request?.id === 'onToggleFromPopup'
      const onChangeListFromPopup = request?.id === 'onChangeListFromPopup'
      const onTabActivated = request?.id === 'onTabActivated'

      if (onToggleFromPopup) {
        setActive(request.isActive)
      } else if (onChangeListFromPopup) {
        initList(request.list)
      } else if (onTabActivated) {
        setActive(request.isActive)
        initList(request.list)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    isFocusModeOn && (
      <dialog
        className="font-sans fixed z-50 top-0 left-0 right-0 bottom-0 h-screen w-screen bg-black/80 flex justify-center align-middle backdrop-saturate-50 backdrop-blur-sm"
        open
      >
        <div className="absolute top-[200px] w-[460] m-h-[208px] rounded-md bg-[#111827]/100">
          <div className="text-white p-4">{'Focus mode is on'}</div>
          <div className="mt-3 mb-8 text-white px-4">
            {'Distracting websites are now blocked'}
          </div>
          <div className="flex flex-col justify-center mt-4 text-white ">
            <button
              className="p-2 w-full py-3 hover:bg-slate-800 transition-all"
              type="button"
            >
              {'OK'}
            </button>
            <button
              className="p-2 w-full py-3 hover:bg-slate-800 transition-all"
              type="button"
            >
              {'Take a 5 minutes break'}
            </button>
          </div>
        </div>
      </dialog>
    )
  )
}

export default Content

export { getStyle, config }
