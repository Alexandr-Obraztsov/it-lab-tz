// Общие типы приложения
export interface BaseEntity {
	id: string | number
	createdAt?: string
	updatedAt?: string
}

export interface ApiResponse<T> {
	data: T
	message?: string
	success: boolean
}

export interface PaginatedResponse<T> {
	data: T[]
	total: number
	page: number
	limit: number
}

export interface LoadingState {
	isLoading: boolean
	error: string | null
}

// Типы для приложения знакомств
export interface User extends BaseEntity {
	email: string
	name: string
	age: number
	bio?: string
	photos: Photo[]
	tags: string[]
	preferences: UserPreferences
	location: Location
	isVerified: boolean
}

export interface Photo {
	id: string
	url: string
	order: number
	isMain: boolean
}

export interface UserPreferences {
	ageRange: {
		min: number
		max: number
	}
	maxDistance: number
	showMeOnTinder: boolean
	discoverySettings: {
		men: boolean
		women: boolean
	}
}

export interface Location {
	latitude: number
	longitude: number
	city?: string
	country?: string
}

export interface Profile extends BaseEntity {
	user: User
	distance?: number
	isOnline: boolean
	lastSeen?: string
}

export interface Match extends BaseEntity {
	profiles: [User, User]
	messages: Message[]
	matchedAt: string
	isActive: boolean
}

export interface Message extends BaseEntity {
	senderId: string
	content: string
	sentAt: string
	isRead: boolean
}

export interface Like extends BaseEntity {
	fromUserId: string
	toUserId: string
	isSuper: boolean
	createdAt: string
}

// Состояния для регистрации
export interface RegistrationStep {
	step: number
	isCompleted: boolean
	data: any
}

export interface RegistrationState {
	currentStep: number
	steps: {
		name: RegistrationStep
		tags: RegistrationStep
		photos: RegistrationStep
	}
	isCompleted: boolean
}

// Состояние для свайпов
export interface SwipeState {
	currentProfileIndex: number
	profiles: Profile[]
	swipeHistory: SwipeAction[]
	isLoading: boolean
	hasMore: boolean
}

export interface SwipeAction {
	profileId: string
	action: 'like' | 'dislike' | 'superlike'
	timestamp: string
}

// Состояние аутентификации
export interface AuthState {
	isAuthenticated: boolean
	token: string | null
	refreshToken: string | null
	user: User | null
	isLoading: boolean
	error: string | null
}

export type Nullable<T> = T | null | undefined
