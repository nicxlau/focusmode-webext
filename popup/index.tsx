import '../styles.css'
import Front from './pages/front'
import { useState } from 'react'
import { Router } from 'react-chrome-extension-router'

function IndexPopup() {
  return (
    <div className="bg-white h-[540px] w-[360px]">
      <Router>
        <Front />
      </Router>
    </div>
  )
}

export default IndexPopup
