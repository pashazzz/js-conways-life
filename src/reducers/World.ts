import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface WorldState {
  world: number[][]
}

const initialState: WorldState = {
  world: [[]],
}

export const worldSlice = createSlice({
  name: 'world',
  initialState,
  reducers: {
    updateState: (state, action: PayloadAction<number[][]>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.world = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateState } = worldSlice.actions

export default worldSlice.reducer