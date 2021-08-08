import React, { useState } from 'react'
import ReactDom from 'react-dom'

import './styles.scss'
import Header from './components/Header'
import World from './components/World'
import Sidebar from './components/Sidebar'

export interface ICoords {
  x: number,
  y: number,
}

export interface IWorldSize {
  size: ICoords,
}

export interface ISetWorldSize {
  setWorldSize(arg0: ICoords): any
}

const App = () => {
  const [worldSize, setWorldSize] = useState({x: 4, y:4})

  return (<>
    <Header />
    <div className="main">
      <World size={worldSize} />
      <Sidebar setWorldSize={setWorldSize}/>
    </div>
  </>)
}

ReactDom.render(<App />, document.querySelector('#root'))