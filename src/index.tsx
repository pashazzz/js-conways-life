import React, { useState } from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store'

import './styles.scss'
import Header from './components/Header'
import World from './components/World'
import Sidebar from './components/Sidebar'

const App = () => {

  return (<Provider store={store}>
    <Header />
    <div className="main">
      <World />
      <Sidebar />
    </div>
  </Provider>)
}

ReactDom.render(<App />, document.querySelector('#root'))