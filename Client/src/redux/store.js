import { configureStore } from '@reduxjs/toolkit'
import { api } from './api'
import UserSlice from './toolkit'

export const store = configureStore({
  reducer: {
    UserSlice: UserSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})
