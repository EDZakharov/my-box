import {
  createApi,
  fetchBaseQuery,
  retry,
} from '@reduxjs/toolkit/dist/query/react'
import { login } from './toolkit'
import { useNavigate } from 'react-router-dom'

export const staggeredBaseQuery = retry(
  fetchBaseQuery({
    baseUrl: 'http://localhost:7000/user/',
    credentials: 'include',
  }),
  {
    maxRetries: 2,
  }
)

//REAUTH
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await staggeredBaseQuery(args, api, extraOptions)
  if (result.data && !result.error) {
    api.dispatch(
      login({
        email: result.data.email,
        login: result.data.login,
        password: result.data.password,
      })
    )
    // eslint-disable-next-line react-hooks/rules-of-hooks
  }
  return result
}

//CREATE_API
export const api = createApi({
  reducerPath: 'user',
  tagTypes: ['user__data'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
})

//COMMON
const retRes = (result) => {
  if (result) {
    return [
      ...result.map(({ id }) => ({ type: 'user__data', id })),
      { type: 'user__data', id: 'LIST' },
    ]
  } else {
    return [{ type: 'user__data', id: 'LIST' }]
  }
}

//WORKSPACE
const workspace = api.injectEndpoints({
  endpoints: (build) => ({
    //AUTH
    login: build.mutation({
      query: ({ login, password }) => ({
        url: 'login',
        method: 'POST',
        body: { login, password },
      }),
      invalidatesTags: ['user__data'],
      providesTags: retRes,
    }),
  }),
})

export const { useLoginMutation } = workspace
