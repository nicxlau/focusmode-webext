import * as React from 'react'
import Tabs from '../components/Tabs'

interface IScheduleProps {}

const Schedule: React.FunctionComponent<IScheduleProps> = (props) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1">schedule</div>
      <Tabs></Tabs>
    </div>
  )
}

export default Schedule
