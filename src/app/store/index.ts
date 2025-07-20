import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import userReducer from './slices/userSlice'
import registrationReducer from './slices/registrationSlice'
import profilesReducer from './slices/profilesSlice'
import swipeReducer from './slices/swipeSlice'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		user: userReducer,
		registration: registrationReducer,
		profiles: profilesReducer,
		swipe: swipeReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				// Игнорируем действия с Date объектами
				ignoredActions: [
					'swipe/swipeLeft',
					'swipe/swipeRight',
					'swipe/swipeUp',
				],
				ignoredPaths: ['swipe.swipeHistory.timestamp'],
			},
		}),
	devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Селекторы для удобного доступа к состоянию
export const selectAuth = (state: RootState) => state.auth
export const selectUser = (state: RootState) => state.user
export const selectRegistration = (state: RootState) => state.registration
export const selectProfiles = (state: RootState) => state.profiles
export const selectSwipe = (state: RootState) => state.swipe

// Дополнительные селекторы
export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectIsAuthenticated = (state: RootState) =>
	state.auth.isAuthenticated
export const selectCurrentProfile = (state: RootState) => {
	const { profiles, currentIndex } = state.profiles
	return profiles[currentIndex] || null
}
export const selectRegistrationProgress = (state: RootState) => {
	const { steps, currentStep } = state.registration
	const totalSteps = Object.keys(steps).length
	const completedSteps = Object.values(steps).filter(
		step => step.isCompleted
	).length
	return { completedSteps, totalSteps, currentStep }
}
export const selectSwipeStats = (state: RootState) => {
	const { swipeHistory, matches } = state.swipe
	const likes = swipeHistory.filter(action => action.action === 'like').length
	const superlikes = swipeHistory.filter(
		action => action.action === 'superlike'
	).length
	const dislikes = swipeHistory.filter(
		action => action.action === 'dislike'
	).length
	return {
		totalSwipes: swipeHistory.length,
		likes,
		superlikes,
		dislikes,
		matches: matches.length,
	}
}
