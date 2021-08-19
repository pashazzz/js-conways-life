import { configureStore } from '@reduxjs/toolkit'
import worldReducer from './reducers/WorldReducer'
import settingsReducer from './reducers/SettingsReducer'

export const store = configureStore({
  reducer: {
    world: worldReducer,
    settings: settingsReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {world: WorldState}
export type AppDispatch = typeof store.dispatch