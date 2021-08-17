import React, { useState } from 'react'

import { ISetWorldSize } from '../index'

import './Sidebar.scss'

const Sidebar: React.FC<ISetWorldSize> = ({ setWorldSize }) => {
  const minSize = 10
  const maxSize = 100
  const [width, setWidth] = useState(minSize)
  const [height, setHeight] = useState(minSize)

  const changeSize = (e) => {
    let val = Math.round(e.target.value)
    if (val > maxSize) {
      val = maxSize
    }
    if (val < minSize) {
      val = minSize
    }
    const sizeStateMap = {
      width: setWidth,
      height: setHeight,
    }
    sizeStateMap[e.target.id](Number(val))
  }

  const createNewWorld = () => {
    setWorldSize({x: width, y: height})
  }

  return (
    <div className="section sidebar">
      <h2>Options</h2>
      <h3>Create the world</h3>
      
      <div>
        <label htmlFor="width">Width: </label>
        <input
          id="width"
          className="input-size"
          type="number"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          onBlur={changeSize}
        />
        <label htmlFor="height">Height: </label>
        <input
          id="height"
          className="input-size"
          type="number"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          onBlur={changeSize}
        />
      </div>
      <div>
        <button onClick={createNewWorld}>Create new world</button>
      </div>

    </div>
  )
}

export default Sidebar