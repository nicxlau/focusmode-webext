import { IconButton } from '../../../components/IconButton'
import AllowedList from './AllowedList'
import BlockedList from './BlockedList'
import { motion } from 'framer-motion'
import * as React from 'react'
import type { FunctionComponent } from 'react'
import { goTo } from 'react-chrome-extension-router'

interface Tab {
  id: string
  title: string
}

const ListTabs: FunctionComponent = () => {
  const [selectedTabId, setSelectedTabId] = React.useState('blocked')

  const handleNav = React.useCallback(
    (tab: Tab) => () => {
      setSelectedTabId(tab.id)
    },
    []
  )

  const tabs = [
    {
      id: 'blocked',
      title: 'Blocked',
    },
    {
      id: 'allowed',
      title: 'Allowed',
    },
  ]

  return (
    <nav>
      <ul className="flex w-full justify-between align-middle">
        {tabs.map((tab) => {
          const isSelected = tab.id === selectedTabId

          return (
            <li
              className={`relative cursor-pointer capitalize w-1/2 ${
                isSelected ? 'bg-indigo-300' : 'bg-indigo-900'
              }`}
              key={tab.id}
              onClick={handleNav(tab)}
            >
              <div
                className={`text-center p-4 ${
                  isSelected ? 'text-indigo-900' : 'text-white'
                }`}
              >
                {tab.title}
              </div>
              {/* {isSelected ? (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-500 rounded"
                  layoutId="list-underline"
                />
              ) : null} */}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default ListTabs
