import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'

import { newWorld, updateState } from '../reducers/WorldReducer'
import Life from '../Life'

import './Sidebar.scss'

const life = new Life()

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch()
  const world = useAppSelector((state) => state.world)

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
    dispatch(newWorld({height, width}))
  }

  const getNextGen = () => {
    life.nextGen(world.world)
      .then((result) => {
        dispatch(updateState(result.gen))
      })
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

      <hr />
      <h3>Play</h3>

      <div>
        <button onClick={getNextGen}>Next generation</button>
      </div>

    </div>
  )
}

export default Sidebar