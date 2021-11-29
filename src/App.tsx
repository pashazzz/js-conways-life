import React from 'react'
import { useAppDispatch, useAppSelector } from './hooks'

import './styles.scss'
import Header from './components/Header'
import World from './components/World'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'

import { updateState } from './reducers/WorldReducer'
import { parseLink } from './helpers/base64'

const App = () => {
  const dispatch = useAppDispatch()
  const settings = useAppSelector((state) => state.settings)

  if (window.location.search !== '') {
    try {
      const gettedWorld = parseLink(window.location.search.substr(1))
      dispatch(updateState(gettedWorld))
    } catch (e) {
      console.log('Corrupted GET params')
      console.error(e)
    }
  }

  return (
    <div className={'app ' + settings.theme.class}>
      <Header />
      <div className="main">
        <World />
        <Sidebar />
      </div>
      <Footer />
    </div>
  )
}

export default App