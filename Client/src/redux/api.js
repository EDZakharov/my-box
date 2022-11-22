import {
  createApi,
  fetchBaseQuery,
  retry,
} from '@reduxjs/toolkit/dist/query/react'
import { setUser, setToken } from './toolkit'
// import { useNavigate } from 'react-router-dom'

export const staggeredBaseQuery = retry(
  fetchBaseQuery({
    baseUrl: 'http://localhost:7000/user/',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().accessToken
      headers.set('Authorization', `Bearer ${token ? token : ''}`)
      return headers
    },
  }),
  {
    maxRetries: 0.5,
  }
)

//REAUTH
const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await staggeredBaseQuery(args, api, extraOptions)

  if (result.data && !result.error) {
    if (api.endpoint === 'login') {
      api.dispatch(
        setUser({
          email: result.data[1].email,
          login: result.data[1].login,
          password: result.data[1].password,
        })
      )
      api.dispatch(setToken(result.data[0].accessToken))
      return result
    }
    if (api.endpoint === 'refresh') {
      if (result.data.length === 2) {
        api.dispatch(
          setUser({
            email: result.data[1].email,
            login: result.data[1].login,
            password: result.data[1].password,
          })
        )
        api.dispatch(setToken(result.data[0].accessToken))

        return result
      }
    }
  } else {
    return result
  }
}

//CREATE_API
export const api = createApi({
  reducerPath: 'user',
  tagTypes: ['user__data'],
  baseQuery: baseQueryWithReAuth,
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
export const workspace = api.injectEndpoints({
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
    refresh: build.query({
      query: () => ({
        url: 'refresh',
        method: 'GET',
      }),
      invalidatesTags: ['user__data'],
      providesTags: retRes,
    }),
  }),
})

export const { useLoginMutation, useRefreshQuery } = workspace
