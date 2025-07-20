import { configureStore } from '@reduxjs/toolkit'
import { profileReducer } from './slices'
import { usersReducer } from './slices/usersSlice'

export const store = configureStore({
	reducer: {
		profile: profileReducer,
		users: usersReducer,
	},

	devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
