import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Profile, LoadingState } from '../../../shared/types'

interface ProfilesState extends LoadingState {
	profiles: Profile[]
	currentIndex: number
	hasMore: boolean
	filters: {
		ageRange: { min: number; max: number }
		maxDistance: number
		showMen: boolean
		showWomen: boolean
	}
	totalProfiles: number
}

const initialState: ProfilesState = {
	profiles: [],
	currentIndex: 0,
	hasMore: true,
	isLoading: false,
	error: null,
	filters: {
		ageRange: { min: 18, max: 80 },
		maxDistance: 50,
		showMen: true,
		showWomen: true,
	},
	totalProfiles: 0,
}

const profilesSlice = createSlice({
	name: 'profiles',
	initialState,
	reducers: {
		setProfiles: (state, action: PayloadAction<Profile[]>) => {
			state.profiles = action.payload
			state.currentIndex = 0
			state.error = null
		},
		addProfiles: (state, action: PayloadAction<Profile[]>) => {
			state.profiles.push(...action.payload)
			state.error = null
		},
		removeProfile: (state, action: PayloadAction<string>) => {
			const profileId = action.payload
			const index = state.profiles.findIndex(
				(profile: Profile) => profile.id === profileId
			)
			if (index > -1) {
				state.profiles.splice(index, 1)
				// Если удаляем текущий профиль, переходим к следующему
				if (index <= state.currentIndex && state.currentIndex > 0) {
					state.currentIndex -= 1
				}
			}
		},
		nextProfile: state => {
			if (state.currentIndex < state.profiles.length - 1) {
				state.currentIndex += 1
			}
		},
		prevProfile: state => {
			if (state.currentIndex > 0) {
				state.currentIndex -= 1
			}
		},
		setCurrentIndex: (state, action: PayloadAction<number>) => {
			const index = action.payload
			if (index >= 0 && index < state.profiles.length) {
				state.currentIndex = index
			}
		},
		updateFilters: (
			state,
			action: PayloadAction<Partial<ProfilesState['filters']>>
		) => {
			state.filters = { ...state.filters, ...action.payload }
		},
		updateAgeRange: (
			state,
			action: PayloadAction<{ min: number; max: number }>
		) => {
			state.filters.ageRange = action.payload
		},
		updateMaxDistance: (state, action: PayloadAction<number>) => {
			state.filters.maxDistance = action.payload
		},
		toggleShowMen: state => {
			state.filters.showMen = !state.filters.showMen
		},
		toggleShowWomen: state => {
			state.filters.showWomen = !state.filters.showWomen
		},
		setHasMore: (state, action: PayloadAction<boolean>) => {
			state.hasMore = action.payload
		},
		setTotalProfiles: (state, action: PayloadAction<number>) => {
			state.totalProfiles = action.payload
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload
			if (action.payload) {
				state.error = null
			}
		},
		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload
			state.isLoading = false
		},
		clearError: state => {
			state.error = null
		},
		clearProfiles: state => {
			state.profiles = []
			state.currentIndex = 0
			state.hasMore = true
			state.totalProfiles = 0
			state.error = null
		},
		// Обновление онлайн статуса профиля
		updateProfileOnlineStatus: (
			state,
			action: PayloadAction<{
				profileId: string
				isOnline: boolean
				lastSeen?: string
			}>
		) => {
			const { profileId, isOnline, lastSeen } = action.payload
			const profile = state.profiles.find((p: Profile) => p.id === profileId)
			if (profile) {
				profile.isOnline = isOnline
				if (lastSeen) {
					profile.lastSeen = lastSeen
				}
			}
		},
		// Обновление расстояния до профиля
		updateProfileDistance: (
			state,
			action: PayloadAction<{ profileId: string; distance: number }>
		) => {
			const { profileId, distance } = action.payload
			const profile = state.profiles.find((p: Profile) => p.id === profileId)
			if (profile) {
				profile.distance = distance
			}
		},
		// Перемешивание профилей
		shuffleProfiles: state => {
			const shuffled = [...state.profiles]
			for (let i = shuffled.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1))
				;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
			}
			state.profiles = shuffled
			state.currentIndex = 0
		},
	},
})

export const {
	setProfiles,
	addProfiles,
	removeProfile,
	nextProfile,
	prevProfile,
	setCurrentIndex,
	updateFilters,
	updateAgeRange,
	updateMaxDistance,
	toggleShowMen,
	toggleShowWomen,
	setHasMore,
	setTotalProfiles,
	setLoading,
	setError,
	clearError,
	clearProfiles,
	updateProfileOnlineStatus,
	updateProfileDistance,
	shuffleProfiles,
} = profilesSlice.actions

export default profilesSlice.reducer
