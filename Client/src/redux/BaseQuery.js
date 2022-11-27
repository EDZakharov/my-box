import { fetchBaseQuery, retry } from '@reduxjs/toolkit/dist/query/react'
import { setAccessToken, logout, resetAccessToken, pending } from './toolkit'
import { Mutex } from 'async-mutex'

/*
  Automatic re-authorization
  Usage Guide:
  https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#preventing-multiple-unauthorized-errors
*/

const mutex = new Mutex()
export const staggeredBaseQuery = retry(
  fetchBaseQuery({
    baseUrl: 'http://localhost:7000/user/',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().UserSlice.accessToken
      if (token) {
        headers.set('Authorization', `Bearer ${token ? token : ''}`)
      }
      return headers
    },
  }),
  {
    maxRetries: 0.5,
  }
)

export const baseQueryWithReAuth = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()
  let interval
  let result = await staggeredBaseQuery(args, api, extraOptions)
  console.log('Server-response', result)

  if (result.error && result.error?.status !== 'FETCH_ERROR') {
    api.dispatch(pending(false))
    clearInterval(interval)
    console.log('stopInterval')
  }
  if (result.error?.status === 'FETCH_ERROR') {
    clearInterval(interval)
    api.dispatch(pending(true))
    console.error('Net connection closed')
    console.error('Wait few minutes! We check new response data :)')
    interval = setInterval(async () => {
      await staggeredBaseQuery(args, api, extraOptions)
      // if (fetchErr.error?.status !== 'FETCH_ERROR' && fetchErr.meta.response) {

      // }
    }, 2000)
  }
  if (result.error && result.error.status === 409) {
    api.dispatch(logout())
    api.dispatch(pending(false))
  }

  if (!result.error && result.data.accessToken) {
    api.dispatch(setAccessToken(result.data.accessToken))
    api.dispatch(pending(false))
  }
  if (result.error && result.error.originalStatus === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const refreshResult = await staggeredBaseQuery(
          'refresh',
          api,
          extraOptions
        )
        if (refreshResult.data) {
          api.dispatch(resetAccessToken(refreshResult.data.accessToken))
          api.dispatch(pending(false))
          result = await staggeredBaseQuery(args, api, extraOptions)
        } else {
          api.dispatch(logout())
          api.dispatch(pending(false))
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await staggeredBaseQuery(args, api, extraOptions)
      return result
    }
  }
  return result
}
