import Front from '../pages/front'
import List from '../pages/list'
import Schedule from '../pages/schedule'
import Settings from '../pages/settings'
import { IconButton } from './IconButton'
import { motion } from 'framer-motion'
import * as React from 'react'
import type { FunctionComponent } from 'react'
import { goTo } from 'react-chrome-extension-router'

interface Tab {
  id: string
  component: FunctionComponent
}

const Tabs: FunctionComponent = () => {
  const [selectedTabId, setSelectedTabId] = React.useState('front')

  const handleNav = React.useCallback(
    (tab: Tab) => () => {
      goTo(tab.component, { id: tab.id })
      setSelectedTabId(tab.id)
    },
    []
  )

  const tabs = [
    {
      id: 'front',
      component: Front,
    },
    {
      id: 'list',
      component: List,
    },
    {
      id: 'schedule',
      component: Schedule,
    },
    {
      id: 'settings',
      component: Settings,
    },
  ]

  return (
    <nav>
      <ul className="flex w-full bg-[hsl(221,39%,14%)] justify-between text-lg  align-middle px-4">
        {tabs.map((tab) => {
          return (
            <li
              className="relative cursor-pointer"
              key={tab.id}
              onClick={handleNav(tab)}
            >
              <IconButton id={tab.id} selectedTabId={selectedTabId} />
              {tab.id === selectedTabId ? (
                <motion.div
                  className="absolute top-0 left-2 right-2 h-[3px] bg-[#4364ea] rounded"
                  layoutId="underline"
                />
              ) : null}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Tabs
