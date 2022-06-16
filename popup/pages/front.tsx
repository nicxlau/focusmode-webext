import { useActive } from '../../hooks/useActive'
import { useStore } from '../../hooks/useStore'
import { Switch } from '../components/Switch'
import Tabs from '../components/Tabs'
import * as React from 'react'

const Front: React.FunctionComponent = () => {
  const initRef = React.useRef(null)

  const { active, setActive } = useActive({ shouldSync: false })
  const { getCurrentTabId } = useStore()

  const onToggle = () => {
    setActive(!active)
  }

  React.useEffect(() => {
    getCurrentTabId()
  }, [])

  return (
    <div className="flex flex-col h-screen">
      <div className="p-3 flex w-full justify-between h-10 bg-slate-600 flex-1">
        <p className="text-white text-base">Focus mode</p>
        <Switch onChange={onToggle} checked={active} />
      </div>
      <Tabs />
    </div>
  )
}

export default Front
