import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type {
	User,
	Photo,
	UserPreferences,
	LoadingState,
} from '../../../shared/types'

interface UserState extends LoadingState {
	profile: User | null
	isEditing: boolean
}

const initialState: UserState = {
	profile: null,
	isLoading: false,
	error: null,
	isEditing: false,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setProfile: (state, action: PayloadAction<User>) => {
			state.profile = action.payload
			state.error = null
		},
		updateProfile: (state, action: PayloadAction<Partial<User>>) => {
			if (state.profile) {
				state.profile = { ...state.profile, ...action.payload }
			}
		},
		updateBasicInfo: (
			state,
			action: PayloadAction<{ name?: string; age?: number; bio?: string }>
		) => {
			if (state.profile) {
				const { name, age, bio } = action.payload
				if (name !== undefined) state.profile.name = name
				if (age !== undefined) state.profile.age = age
				if (bio !== undefined) state.profile.bio = bio
			}
		},
		addPhoto: (state, action: PayloadAction<Photo>) => {
			if (state.profile) {
				state.profile.photos.push(action.payload)
				// Если это первое фото, делаем его главным
				if (state.profile.photos.length === 1) {
					state.profile.photos[0].isMain = true
				}
			}
		},
		removePhoto: (state, action: PayloadAction<string>) => {
			if (state.profile) {
				const photoId = action.payload
				const index = state.profile.photos.findIndex(
					(photo: Photo) => photo.id === photoId
				)

				if (index > -1) {
					const removedPhoto = state.profile.photos[index]
					state.profile.photos.splice(index, 1)

					// Если удаляем главное фото, делаем главным первое из оставшихся
					if (removedPhoto.isMain && state.profile.photos.length > 0) {
						state.profile.photos[0].isMain = true
					}
				}
			}
		},
		setMainPhoto: (state, action: PayloadAction<string>) => {
			if (state.profile) {
				const photoId = action.payload
				state.profile.photos.forEach(photo => {
					photo.isMain = photo.id === photoId
				})
			}
		},
		reorderPhotos: (state, action: PayloadAction<Photo[]>) => {
			if (state.profile) {
				state.profile.photos = action.payload.map((photo, index) => ({
					...photo,
					order: index,
				}))
			}
		},
		updateTags: (state, action: PayloadAction<string[]>) => {
			if (state.profile) {
				state.profile.tags = action.payload
			}
		},
		addTag: (state, action: PayloadAction<string>) => {
			if (state.profile && !state.profile.tags.includes(action.payload)) {
				state.profile.tags.push(action.payload)
			}
		},
		removeTag: (state, action: PayloadAction<string>) => {
			if (state.profile) {
				const index = state.profile.tags.indexOf(action.payload)
				if (index > -1) {
					state.profile.tags.splice(index, 1)
				}
			}
		},
		updatePreferences: (
			state,
			action: PayloadAction<Partial<UserPreferences>>
		) => {
			if (state.profile) {
				state.profile.preferences = {
					...state.profile.preferences,
					...action.payload,
				}
			}
		},
		updateAgeRange: (
			state,
			action: PayloadAction<{ min: number; max: number }>
		) => {
			if (state.profile) {
				state.profile.preferences.ageRange = action.payload
			}
		},
		updateMaxDistance: (state, action: PayloadAction<number>) => {
			if (state.profile) {
				state.profile.preferences.maxDistance = action.payload
			}
		},
		toggleShowMeOnTinder: state => {
			if (state.profile) {
				state.profile.preferences.showMeOnTinder =
					!state.profile.preferences.showMeOnTinder
			}
		},
		updateDiscoverySettings: (
			state,
			action: PayloadAction<{ men: boolean; women: boolean }>
		) => {
			if (state.profile) {
				state.profile.preferences.discoverySettings = action.payload
			}
		},
		setEditing: (state, action: PayloadAction<boolean>) => {
			state.isEditing = action.payload
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
		clearProfile: state => {
			state.profile = null
			state.isEditing = false
			state.error = null
		},
	},
})

export const {
	setProfile,
	updateProfile,
	updateBasicInfo,
	addPhoto,
	removePhoto,
	setMainPhoto,
	reorderPhotos,
	updateTags,
	addTag,
	removeTag,
	updatePreferences,
	updateAgeRange,
	updateMaxDistance,
	toggleShowMeOnTinder,
	updateDiscoverySettings,
	setEditing,
	setLoading,
	setError,
	clearError,
	clearProfile,
} = userSlice.actions

export default userSlice.reducer
