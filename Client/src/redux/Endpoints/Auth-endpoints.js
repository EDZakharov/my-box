import { api } from '../api'

const authEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    refresh: build.query({
      query: () => ({
        url: 'refresh',
        method: 'GET',
      }),
      invalidatesTags: ['user__data'],
      providesTags: (result) => {
        if (result) {
          return [
            ...result.map(({ id }) => ({ type: 'user__data', id })),
            { type: 'user__data', id: 'LIST' },
          ]
        } else {
          return [{ type: 'user__data', id: 'LIST' }]
        }
      },
    }),
    auth: build.query({
      query: () => ({
        url: 'auth',
        method: 'GET',
      }),
      invalidatesTags: ['auth'],
      providesTags: (result) => {
        const res = [{ ...result }]
        if (res) {
          return [
            ...res.map(({ id }) => ({ type: 'auth', id })),
            { type: 'auth', id: 'LIST' },
          ]
        } else {
          return [{ type: 'auth', id: 'LIST' }]
        }
      },
    }),
  }),
})

export const { useRefreshQuery, useAuthQuery } = authEndpoints
