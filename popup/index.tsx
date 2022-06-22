import '../styles.css'
import Front from './pages/front'
import type { FunctionComponent } from 'react'
import { Router } from 'react-chrome-extension-router'

const IndexPopup: FunctionComponent = () => {
  return (
    <div className="bg-white h-[540px] w-[360px]">
      <Router>
        <Front />
      </Router>
    </div>
  )
}

export default IndexPopup
