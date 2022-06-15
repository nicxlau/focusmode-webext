import '../styles.css'
import Front from './pages/list'
import { useState } from 'react'
import { Router } from 'react-chrome-extension-router'

function IndexPopup() {
  const [data, setData] = useState('')

  return (
    <div className="bg-white h-[540px] w-[360px]">
      <Router>
        <Front />
      </Router>
    </div>
  )
}

export default IndexPopup
