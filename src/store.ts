import { configureStore } from '@reduxjs/toolkit'
import worldReducer from './reducers/World'

export const store = configureStore({
  reducer: {
    world: worldReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch