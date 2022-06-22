import Tabs from '../../components/Tabs'
import { Form } from './components/Form'
import type * as React from 'react'
import { useStore } from '~/hooks/useStore'

const List: React.FunctionComponent = () => {
  const { list } = useStore()

  return (
    <div className="flex flex-col h-screen bg-[#222222]">
      <div className="p-6 w-full basis-12">
        <p className="text-base font-lg pb-4 text-white">
          {'Blocked websites'}
        </p>
        <Form />
      </div>
      <ul className="overflow-y-auto flex-1">
        {list.map(({ url }) => {
          return (
            <li
              className="px-6 py-2 flex cursor-pointer hover:bg-neutral-900 text-white"
              key={url}
            >
              <div className="text-base">{url}</div>
            </li>
          )
        })}
      </ul>
      <Tabs />
    </div>
  )
}

export default List
