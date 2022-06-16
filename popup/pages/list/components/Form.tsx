import * as React from 'react'
import { useList } from '~/hooks/useList'
import type { LinkType } from '~/hooks/useStore/list'

export interface IFormProps {}

export const Form: React.FunctionComponent<IFormProps> = (props) => {
  const [url, setURL] = React.useState<LinkType['url']>('')

  const { addLink } = useList()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setURL(value)
  }

  // console.log('list', list)

  const handleSubmit = () => {
    setURL('')
    if (url) {
      addLink(url)
    }
  }

  return (
    <div>
      <label className="block">
        {/* <span className="text-gray-700">Blocked website link</span> */}
        <input
          type="text"
          className="
            p-[14px]
            mt-1
            block
            w-full
            rounded-md
            leading-5
            h-12
            text-white
            bg-[#181818]
            border 
            border-[#2f2f2f] 
            "
          value={url}
          onChange={handleChange}
        ></input>
      </label>

      <button
        className="mt-4 w-full px-12 py-2 text-base font-medium text-white bg-indigo-600 border border-indigo-600 rounded-md focus:outline-none focus:ring"
        onClick={handleSubmit}
      >
        Add Link
      </button>
    </div>
  )
}
