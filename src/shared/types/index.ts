export type Nullable<T> = T | null | undefined

export type Profile = {
	username: string
	passions: string[]
	photos: Photo[]
}

export type RegistrationState = {
	currentStep: number
	steps: {
		name: {
			isCompleted: boolean
			name: string
		}
		tags: {
			isCompleted: boolean
			selectedTags: string[]
			availableTags: string[]
		}
		photos: {
			isCompleted: boolean
			photos: Photo[]
		}
	}
}

export type Photo = {
	id: string
	url: string
}
