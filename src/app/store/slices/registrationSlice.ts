import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RegistrationState, Photo } from '../../../shared/types'

const initialState: RegistrationState = {
	currentStep: 1,
	steps: {
		name: {
			step: 1,
			isCompleted: false,
			data: {
				name: '',
				email: '',
				age: null,
				bio: '',
			},
		},
		tags: {
			step: 2,
			isCompleted: false,
			data: {
				selectedTags: [],
				availableTags: [
					'Спорт',
					'Путешествия',
					'Музыка',
					'Кино',
					'Книги',
					'Искусство',
					'Фотография',
					'Готовка',
					'Танцы',
					'Игры',
					'Технологии',
					'Природа',
				],
			},
		},
		photos: {
			step: 3,
			isCompleted: false,
			data: {
				photos: [],
				mainPhotoId: null,
			},
		},
	},
	isCompleted: false,
}

const registrationSlice = createSlice({
	name: 'registration',
	initialState,
	reducers: {
		setCurrentStep: (state, action: PayloadAction<number>) => {
			state.currentStep = action.payload
		},
		nextStep: state => {
			if (state.currentStep < 3) {
				state.currentStep += 1
			}
		},
		prevStep: state => {
			if (state.currentStep > 1) {
				state.currentStep -= 1
			}
		},
		updateNameStep: (
			state,
			action: PayloadAction<{
				name?: string
				email?: string
				age?: number
				bio?: string
			}>
		) => {
			state.steps.name.data = { ...state.steps.name.data, ...action.payload }
			const { name, email, age } = state.steps.name.data
			state.steps.name.isCompleted = !!(name && email && age)
		},
		updateTagsStep: (
			state,
			action: PayloadAction<{ selectedTags: string[] }>
		) => {
			state.steps.tags.data.selectedTags = action.payload.selectedTags
			state.steps.tags.isCompleted = action.payload.selectedTags.length > 0
		},
		addTag: (state, action: PayloadAction<string>) => {
			const tag = action.payload
			const selectedTags = state.steps.tags.data.selectedTags
			if (!selectedTags.includes(tag)) {
				selectedTags.push(tag)
				state.steps.tags.isCompleted = selectedTags.length > 0
			}
		},
		removeTag: (state, action: PayloadAction<string>) => {
			const tag = action.payload
			const selectedTags = state.steps.tags.data.selectedTags
			const index = selectedTags.indexOf(tag)
			if (index > -1) {
				selectedTags.splice(index, 1)
				state.steps.tags.isCompleted = selectedTags.length > 0
			}
		},
		addPhoto: (state, action: PayloadAction<Photo>) => {
			state.steps.photos.data.photos.push(action.payload)
			state.steps.photos.isCompleted = state.steps.photos.data.photos.length > 0

			// Если это первое фото, делаем его главным
			if (state.steps.photos.data.photos.length === 1) {
				state.steps.photos.data.mainPhotoId = action.payload.id
			}
		},
		removePhoto: (state, action: PayloadAction<string>) => {
			const photoId = action.payload
			const photos = state.steps.photos.data.photos
			const index = photos.findIndex((photo: Photo) => photo.id === photoId)

			if (index > -1) {
				photos.splice(index, 1)
				state.steps.photos.isCompleted = photos.length > 0

				// Если удаляем главное фото, делаем главным первое из оставшихся
				if (
					state.steps.photos.data.mainPhotoId === photoId &&
					photos.length > 0
				) {
					state.steps.photos.data.mainPhotoId = photos[0].id
				} else if (photos.length === 0) {
					state.steps.photos.data.mainPhotoId = null
				}
			}
		},
		setMainPhoto: (state, action: PayloadAction<string>) => {
			state.steps.photos.data.mainPhotoId = action.payload
		},
		reorderPhotos: (state, action: PayloadAction<Photo[]>) => {
			state.steps.photos.data.photos = action.payload.map((photo, index) => ({
				...photo,
				order: index,
			}))
		},
		completeRegistration: state => {
			const allStepsCompleted = Object.values(state.steps).every(
				step => step.isCompleted
			)
			state.isCompleted = allStepsCompleted
		},
		resetRegistration: state => {
			return initialState
		},
	},
})

export const {
	setCurrentStep,
	nextStep,
	prevStep,
	updateNameStep,
	updateTagsStep,
	addTag,
	removeTag,
	addPhoto,
	removePhoto,
	setMainPhoto,
	reorderPhotos,
	completeRegistration,
	resetRegistration,
} = registrationSlice.actions

export default registrationSlice.reducer
