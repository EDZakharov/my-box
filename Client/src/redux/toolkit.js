import { createSlice } from '@reduxjs/toolkit'

const UserSlice = createSlice({
  name: 'User',
  initialState: {
    email: null,
    login: null,
    password: null,
    accessToken: null,
  },
  reducers: {
    setUser: (state, action) => {
      state = action.payload
    },
    setToken: (state, action) => {
      state.accessToken = action.payload
    },
  },
})

export default UserSlice

export const { setUser, setToken } = UserSlice.actions
