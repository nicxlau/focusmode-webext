import * as React from 'react'
import { useList } from '~/hooks/useList'
import type { LinkType } from '~hooks/useStore/slices/list'

export const Form: React.FunctionComponent = () => {
  const [url, setURL] = React.useState<LinkType['url']>('')

  const { addLink } = useList()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value

    setURL(value)
  }

  const handleSubmit = (): void => {
    setURL('')

    if (url) {
      addLink(url)
    }
  }

  return (
    <div className="p-6">
      <label className="block">
        {/* <span className="text-gray-700">Blocked website link</span> */}
        <input
          className="
            p-[14px]
            mt-1
            block
            w-full
            rounded-md
            leading-5
            h-12
            text-white
            bg-[#2d3748] border-0 placeholder:text-[#78909c]"
          onChange={handleChange}
          placeholder="twitter.com"
          type="text"
          value={url}
        />
      </label>

      <button
        className="mt-4 w-full px-12 py-2 text-base font-medium text-white bg-indigo-600 border border-indigo-600 rounded-md focus:outline-none focus:ring"
        onClick={handleSubmit}
        type="button"
      >
        {'Add Link'}
      </button>
    </div>
  )
}
