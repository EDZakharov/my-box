import { createSlice } from '@reduxjs/toolkit'

const UserSlice = createSlice({
  name: 'User',
  initialState: {
    email: null,
    login: null,
    password: null,
    accessToken: null,
    auth: false,
    pending: false,
  },
  reducers: {
    setUser: (state, action) => {
      state = action.payload
    },
    setAccessToken: (state, action) => {
      const token = action.payload
      if (token) {
        localStorage.setItem('accessToken', action.payload)
        state.accessToken = action.payload
        state.auth = true
      } else {
        localStorage.removeItem('accessToken')
        state.auth = false
      }
    },
    resetAccessToken: (state, action) => {
      const token = action.payload
      state.auth = false
      if (token) {
        localStorage.setItem('accessToken', action.payload)
        state.accessToken = action.payload
        state.auth = true
      } else {
        localStorage.removeItem('accessToken')
        state.auth = false
      }
    },
    logout: (state) => {
      localStorage.removeItem('accessToken')
      state.accessToken = null
      state.auth = false
    },
    pending: (state, action) => {
      state.pending = action.payload
      console.log('', state.pending)
    },
  },
})

export default UserSlice

export const {
  setUser,
  setToken,
  logout,
  resetAccessToken,
  setAccessToken,
  pending,
} = UserSlice.actions
