import { Form } from './components/Form'
import ListTabs from './components/ListTabs'
import type * as React from 'react'
import { useStore } from '~/hooks/useStore'

const List: React.FunctionComponent = () => {
  const { list } = useStore()

  return (
    <div className="flex flex-col">
      <div className=" w-full">
        <p className="p-6 text-xl font-semibold pb-4 text-white tracking-wide mb-1">
          {'Site List'}
        </p>
        <ListTabs />
        <Form />
      </div>

      <ul className="overflow-y-auto flex-auto">
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
    </div>
  )
}

export default List
