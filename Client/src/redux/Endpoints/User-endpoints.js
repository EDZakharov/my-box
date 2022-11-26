import { api } from '../api'

const workspace = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: ({ login, password }) => ({
        url: 'login',
        method: 'POST',
        body: { login, password },
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
    logout: build.mutation({
      query: ({}) => ({
        url: 'logout',
        method: 'POST',
      }),
      invalidatesTags: ['auth'],
      providesTags: (result) => {
        if (result) {
          return [
            ...result.map(({ id }) => ({ type: 'auth', id })),
            { type: 'auth', id: 'LIST' },
          ]
        } else {
          return [{ type: 'auth', id: 'LIST' }]
        }
      },
    }),
    registration: build.mutation({
      query: ({ email, login, password }) => ({
        url: 'registration',
        method: 'POST',
        body: { email, login, password },
      }),
      invalidatesTags: ['auth'],
      providesTags: (result) => {
        if (result) {
          return [
            ...result.map(({ id }) => ({ type: 'auth', id })),
            { type: 'auth', id: 'LIST' },
          ]
        } else {
          return [{ type: 'auth', id: 'LIST' }]
        }
      },
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation, useRegistrationMutation } =
  workspace
