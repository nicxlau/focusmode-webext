import { useActive } from '../../hooks/useActive'
import { useStore } from '../../hooks/useStore'
import { Switch, type  ISwitchProp} from '../components/Switch'
import Tabs from '../components/Tabs'
import * as React from 'react'

const Front: React.FunctionComponent = () => {
  const { isActive, setActive } = useActive()
  const { getCurrentTabId } = useStore()

  const onToggle: ISwitchProp["onChange"] = ()  => {
    setActive(!isActive)
  }

  React.useEffect(() => {
    getCurrentTabId()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col h-screen">
      <div className="p-3 flex w-full justify-between h-10 bg-[#1F2C47] flex-1">
        <p className="text-white text-base">{'Focus mode'}</p>
        <Switch checked={isActive} onChange={onToggle} />
      </div>
      <Tabs />
    </div>
  )
}

export default Front
