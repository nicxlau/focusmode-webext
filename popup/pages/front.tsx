import * as React from 'react'
import Tabs from '../components/Tabs'
import { Switch } from '../components/Switch'
import { useActive } from '../../hooks/useActive'

const Front: React.FunctionComponent = () => {
  const { active, setActive } = useActive({ shouldSync: false })

  const onToggle = () => {
    setActive(!active)
  }
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
