import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface WorldState {
  world: number[][],
  isRun: boolean,
}

interface WorldSize {
  height: number,
  width: number,
}

const initialState: WorldState = {
  world: [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
  ],
  isRun: false
}

export const worldSlice = createSlice({
  name: 'world',
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    newWorld: (state, action: PayloadAction<WorldSize>) => {
      const newWorld = []
      const row = []
      for (let i = 0; i < action.payload.width; i++) {
        row.push(0)
      }
      for (let j = 0; j < action.payload.height; j++) {
        newWorld.push(row)
      }
      state.world = newWorld
    },
    updateState: (state, action: PayloadAction<number[][]>) => {
      state.world = action.payload
    },
    run: (state) => {
      state.isRun = true
    },
    stop: (state) => {
      state.isRun = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { newWorld, updateState, run, stop } = worldSlice.actions

export default worldSlice.reducer