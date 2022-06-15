import Tabs from '../../components/Tabs'
import { Form } from './components/Form'
import * as React from 'react'
import { goTo } from 'react-chrome-extension-router'
import { useList } from '~/hooks/useList'
import { Switch } from '~/popup/components/Switch'

interface IListProps {}

const List: React.FunctionComponent<IListProps> = () => {
  const { list } = useList({ shouldSync: false })

  const handleAddLink = () => {
    goTo(Form)
  }

  return (
    <div className="flex flex-col h-screen bg-[#222222]">
      <div className="p-6 w-full basis-12">
        <p className="text-base font-lg pb-4 text-white">Blocked websites</p>
        <Form />
      </div>
      <ul className="overflow-y-auto flex-1">
        {list.map(({ url }) => {
          return (
            <li className="px-6 py-2 flex cursor-pointer hover:bg-neutral-900 text-white">
              <div className="text-base">{url}</div>
            </li>
          )
        })}
      </ul>
      <Tabs></Tabs>
    </div>
  )
}

export default List
