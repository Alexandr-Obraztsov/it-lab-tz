import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Базовая конфигурация API
export const baseApi = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: '/api/',
		prepareHeaders: (headers, { getState }) => {
			// Здесь можно добавить токены аутентификации
			const state = getState() as any
			const token = state.auth?.token
			if (token) {
				headers.set('authorization', `Bearer ${token}`)
			}
			headers.set('Content-Type', 'application/json')
			return headers
		},
	}),
	tagTypes: ['User', 'Profile', 'Match', 'Like'],
	endpoints: () => ({}),
})

export default baseApi
