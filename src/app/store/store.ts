import { configureStore } from '@reduxjs/toolkit'
import swipeReducer from './slices/swipeSlice'
import { profileReducer } from './slices/profileSlice'

export const store = configureStore({
	reducer: {
		profile: profileReducer,
		swipe: swipeReducer,
	},

	devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
