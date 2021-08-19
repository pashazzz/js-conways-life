import React from 'react'
import { useAppSelector } from './hooks'

import './styles.scss'
import Header from './components/Header'
import World from './components/World'
import Sidebar from './components/Sidebar'

const App = () => {
  const settings = useAppSelector((state) => state.settings)

  return (
    <div className={'app ' + settings.theme.class}>
      <Header />
      <div className="main">
        <World />
        <Sidebar />
      </div>
    </div>
  )
}

export default App