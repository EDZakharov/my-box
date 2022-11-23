import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithReAuth } from './BaseQuery'

export const api = createApi({
  reducerPath: 'user',
  tagTypes: ['user__data', 'auth'],
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({}),
})
