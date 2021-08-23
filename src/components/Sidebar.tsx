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
  const t = useAppSelector((state) => state.settings.translation)

  const minSize = 10
  const maxSize = window.innerWidth <= 414 ? 40 : 80

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
      <h2>{t['Sidebar']['title']}</h2>
      <h3>{t['Sidebar']['create']['title']}</h3>
      
      <div>
        <label htmlFor="width">{t['Sidebar']['create']['width']}: </label>
        <input
          id="width"
          className="input-size"
          type="number"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          onBlur={changeSize}
        />
        <label htmlFor="height">{t['Sidebar']['create']['height']}: </label>
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
        <button disabled={world.isRun} onClick={createNewWorld}>{t['Sidebar']['create']['btn']}</button>
      </div>

      <hr />
      <h3>{t['Sidebar']['play']['title']}</h3>

      {/** Main control buttons */}
      <div>
        <button
          disabled={world.isRun}
          onClick={() => dispatch(run())}
          className="btn-lg"
        >
          &#9654; {t['Sidebar']['play']['startBtn']}
        </button>
        <button
          disabled={!world.isRun}
          onClick={() => dispatch(stop())}
          className="btn-lg"
        >
           &#10074;&#10074; {t['Sidebar']['play']['stopBtn']}
        </button>
      </div>
      <div>
        <div><b>{t['Sidebar']['play']['speed']}:</b> <span> {speeds[speed] / 1000}{t['Sidebar']['play']['speedCaption']} </span></div>
        <button disabled={speed === speeds.length - 1} onClick={incSpeed}> &#9650; {t['Sidebar']['play']['faster']}</button>
        <button disabled={speed === 0} onClick={decSpeed}> &#9660; {t['Sidebar']['play']['slower']}</button>
      </div>

      {/** Step by step buttons */}
      <div style={{ marginTop: 12 }}>
        <button disabled={world.isRun} onClick={getNextGen}>{t['Sidebar']['play']['next']}</button>
        <button disabled={world.isRun || history.length === 0} onClick={getPrevGen}>{t['Sidebar']['play']['prev']}</button>
      </div>

    </div>
  )
}

export default Sidebar