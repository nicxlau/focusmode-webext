import Front from '../pages/front'
import List from '../pages/list'
import Schedule from '../pages/schedule'
import Settings from '../pages/settings'
import { IconButton } from './IconButton'
import { motion } from 'framer-motion'
import * as React from 'react'
import type { FunctionComponent } from 'react'
import { getCurrent, goTo } from 'react-chrome-extension-router'

interface Tab {
  id: string
  component: FunctionComponent
}

const Tabs: FunctionComponent = () => {
  const [selectedTabId, setSelectedTabId] = React.useState('front')

  const handleNav = React.useCallback(
    (tab: Tab) => () => {
      goTo(tab.component, { id: tab.id })
    },
    []
  )

  const currentTab = getCurrent()

  React.useEffect(() => {
    if (currentTab.props?.id) {
      setSelectedTabId(currentTab.props?.id)
    }
  }, [currentTab.props])

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

  console.log('yo', currentTab)

  return (
    <nav>
      <ul className="flex w-full bg-[#111827] justify-between text-lg  align-middle px-4">
        {tabs.map((tab) => {
          console.log('selectedTab', { selectedTabId, tabId: tab.id })

          return (
            <li
              className="relative cursor-pointer"
              key={tab.id}
              onClick={handleNav(tab)}
            >
              <IconButton id={tab.id} selectedTabId={selectedTabId} />
              {tab.id === selectedTabId ? (
                <motion.div
                  className="absolute top-0 left-2 right-2 h-[2px] bg-yellow-400"
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
