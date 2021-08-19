import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { useAppDispatch, useAppSelector } from '../hooks'

import { newWorld, updateState, run, stop } from '../reducers/WorldReducer'
import Life from '../Life'

import './Sidebar.scss'

const life = new Life()

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch()
  const world = useAppSelector((state) => state.world)

  const minSize = 10
  const maxSize = 100

  const speeds = [
    2000, // 0
    1750, // 1
    1500, // 2
    1200, // 3
    1000, // 4
    750, // 5
    500, // 6
    200, // 7
    100, // 8
  ]

  const [width, setWidth] = useState(minSize)
  const [height, setHeight] = useState(minSize)
  const [speed, setSpeed] = useState(4)

  // loop stores the id of setInterval()
  const [loopId, setLoopId] = useState(0)
  // history stores the prev world`s states
  const [history, setHistory] = useState([])

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
    setHistory([])
  }

  const getNextGen = () => {
    const lastState = history[history.length - 1]
    if (!_.isEqual(lastState, world.world)) {
      setHistory([...history, world.world])
    }
    life.nextGen(world.world)
      .then((result) => {
        dispatch(updateState(result.gen))
      })
  }

  const getPrevGen = () => {
    const prevState = history[history.length - 1]
    dispatch(updateState(prevState))
    setHistory(history.slice(0, history.length - 1))
  }

  const decSpeed = () => {
    if (speed > 0) {
      setSpeed(speed - 1)
    }
  }
  const incSpeed = () => {
    if (speed < speeds.length - 1) {
      setSpeed(speed + 1)
    }
  }

  useEffect(() => {
    clearInterval(loopId)
    if (world.isRun) {
      setLoopId(Number(setInterval(getNextGen, speeds[speed])))
    } else {
      clearInterval(loopId)
    }
  }, [, speed, world])

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
        <button disabled={world.isRun} onClick={createNewWorld}>Create new world</button>
      </div>

      <hr />
      <h3>Play</h3>

      {/** Main control buttons */}
      <div>
        <button
          disabled={world.isRun}
          onClick={() => dispatch(run())}
          className="btn-lg"
        >
          {'>'} Start
        </button>
        <button
          disabled={!world.isRun}
          onClick={() => dispatch(stop())}
          className="btn-lg"
        >
           || Stop
        </button>
      </div>
      <div>
        <div>Speed:</div>
        <button disabled={speed === speeds.length - 1} onClick={incSpeed}> ^ Faster</button>
        <span> {speeds[speed] / 1000}s/generation </span>
        <button disabled={speed === 0} onClick={decSpeed}> v Slower</button>
      </div>

      {/** Step by step buttons */}
      <div style={{ marginTop: 12 }}>
        <button disabled={world.isRun} onClick={getNextGen}>Next generation</button>
        <button disabled={world.isRun || history.length === 0} onClick={getPrevGen}>Prev generation</button>
      </div>

    </div>
  )
}

export default Sidebar