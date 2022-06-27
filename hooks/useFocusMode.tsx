import { useStore } from './useStore'
import { useMemo } from 'react'
import { baseURLRegex } from '~/constants/regex'

export const useFocusMode = (): {
  isFocusModeOn: boolean
  match: RegExpMatchArray | null
} => {
  const { list, isActive } = useStore()

  const match = window.location.href.match(baseURLRegex)

  const isFocusModeOn = useMemo(() => {
    if (match) {
      const baseURL = match[0]

      const pausedURL = list.map(({ url }) => {
        const matchedURL = url.match(baseURLRegex)

        if (matchedURL) {
          return matchedURL[0]
        }

        return ''
      })
      const isPause = pausedURL.includes(baseURL)

      return isPause && isActive
    }

    return false
  }, [isActive, list, match])

  return { isFocusModeOn, match }
}
