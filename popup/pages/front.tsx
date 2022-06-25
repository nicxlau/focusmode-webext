import { useActive } from '../../hooks/useActive'
import { useStore } from '../../hooks/useStore'
import { Switch, type  ISwitchProp} from '../components/Switch'
import * as React from 'react'
import {

  Coffee as CoffeeIcon,
  Circle as CircleIcon,
  Hexagon as HexagonIcon,
} from 'phosphor-react';

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
    <div className="h-full"> 
      <div className="p-5 flex w-full justify-between items-center">
        <div className='flex items-center'>
          <div className='h-[42px] w-[42px] rounded-full flex justify-center items-center bg-[#2d3748] mr-4'>
            <HexagonIcon color="white"size={24} strokeWidth={1}/>
          </div>
          <p className="text-white font-semibold tracking-wide text-lg">{'Focus mode'}</p>
        </div>
        <Switch checked={isActive} onChange={onToggle} />
      </div>
    </div>)
}

export default Front
