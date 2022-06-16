import { useStore } from './useStore'
import type { LinkType } from './useStore/list'
import { useMemo } from 'react'
import { baseURLRegex } from '~/constants/regex'

export const useFocusMode = () => {
  const { list, isActive } = useStore()

  const match = window.location.href.match(baseURLRegex)

  const isFocusModeOn = useMemo(() => {
    if (match) {
      const baseURL = match[0]
      try {
        const pausedURL = list.map(({ url }) => {
          const matchedURL = url.match(baseURLRegex)
          console.log({ matchedURL })

          if (matchedURL) {
            return matchedURL[0]
          }
        })
        const isPause = pausedURL.includes(baseURL)

        console.log({ list, pausedURL, isPause, isActive })

        return isPause && isActive
      } catch (err) {
        console.log('error', err)
      }
    }
    return false
  }, [isActive, list, match])

  return { isFocusModeOn, match }
}
