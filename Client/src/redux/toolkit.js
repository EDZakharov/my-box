import { createSlice } from '@reduxjs/toolkit'

const UserSlice = createSlice({
  name: 'User',
  initialState: {
    email: null,
    login: null,
    password: null,
  },
  reducers: {
    login: (state, action) => {
      state = { ...action.payload }
    },
  },
})

export default UserSlice

export const { login } = UserSlice.actions
