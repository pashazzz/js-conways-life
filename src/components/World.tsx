import React, { useState, useEffect } from 'react'

import './World.scss'

import { IWorldSize } from '../index'

const World: React.FC<IWorldSize> = ({ size }) => {
  const [world, setWorld] = useState([[]])

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
    setWorld(w)
  }, [size])

  const toggleCellState = (x: number, y: number) => {
    const newWorldState = [...world]
    newWorldState[x][y] = world[x][y] === 0 ? 1 : 0
    setWorld(newWorldState)
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