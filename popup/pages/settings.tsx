import Tabs from '../components/Tabs'
import type * as React from 'react'

const Settings: React.FunctionComponent = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1">{'schedule'}</div>
      <Tabs />
    </div>
  )
}

export default Settings
