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
  }),
})

export const { useLoginMutation } = workspace
