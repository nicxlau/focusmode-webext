import '../styles.css'
import Tabs from './components/Tabs'
import Front from './pages/front'
import type { FunctionComponent } from 'react'
import { Router } from 'react-chrome-extension-router'

const IndexPopup: FunctionComponent = () => {
  return (
    <div className="bg-white h-[540px] w-[360px]">
      <div className="flex flex-col h-screen bg-[hsl(221,39%,11%)]">
        <div className="flex-1">
          <Router>
            <Front />
          </Router>
        </div>
        <Tabs />
      </div>
    </div>
  )
}

export default IndexPopup
