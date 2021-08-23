import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks'
import { updateState } from '../reducers/WorldReducer'

import './World.scss'

const World: React.FC = () => {
  const world = useAppSelector((state) => state.world)
  const t = useAppSelector((state) => state.settings.translation)
  const dispatch = useAppDispatch()

  // on click to cell toggle it state
  const toggleCellState = (x: number, y: number) => {
    if (world.isRun) {
      return
    }
    const newWorldState = []
    world.world.forEach((r, rI) => {
      const row = []
      r.forEach((c, cI) => {
        let cell = c
        if (rI === x && cI === y) {
          cell = c === 0 ? 1 : 0
        }
        row.push(cell)
      })
      newWorldState.push(row)
    })
    dispatch(updateState(newWorldState))
  }

  return (
    <div className="section world">
      <h2>{t['World']['title']}</h2>
      {world.world.map((row, rIndex) => (
        <div key={rIndex} className="world-row">
          {row.map((cell, cIndex) => (
            <div
              key={cIndex}
              className={`world-cell ${cell === 0 ? 'cell-dead' : 'cell-live'}`}
              onClick={() => toggleCellState(rIndex, cIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default World