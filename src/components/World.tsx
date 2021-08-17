import React, { useEffect } from 'react'
import { RootState } from '../store'
import { useSelector, useDispatch } from 'react-redux'
import { updateState } from '../reducers/World'

import './World.scss'

import { IWorldSize } from '../index'

const World: React.FC<IWorldSize> = ({ size }) => {
  const world = useSelector((state: RootState) => state.world.world)
  const dispatch = useDispatch()

  const defaultState = 0
  useEffect(() => {
    const w: number[][] = []
    for(let r = 0; r < size.y; r++) {
      const row: number[] = []
      for(let c = 0; c < size.x; c++) {
        row.push(defaultState)
      }
      w.push(row)
    }
    dispatch(updateState(w))
  }, [size])

  const toggleCellState = (x: number, y: number) => {
    const newWorldState = []
    world.forEach((r, rI) => {
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
      <h2>World</h2>
      {world.map((row, rIndex) => (
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