// Types
export type {
	BaseEntity,
	ApiResponse,
	PaginatedResponse,
	LoadingState,
	User,
	Photo,
	UserPreferences,
	Location,
	Profile,
	Match,
	Message,
	Like,
	RegistrationStep,
	RegistrationState,
	SwipeState,
	SwipeAction,
	AuthState,
	Nullable,
} from './types'

// Hooks
export { useAppDispatch, useAppSelector } from './lib/hooks'

// Utils
export { cn } from './lib/utils'

// UI Components
export {
	Button,
	IconButton,
	Input,
	PlusIcon,
	CloseIcon,
	HeartIcon,
	StarIcon,
	CameraIcon,
	EditIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	CheckIcon,
} from './ui'

export type { ButtonProps, IconButtonProps, InputProps, IconProps } from './ui'

// Mock Data
export {
	mockUsers,
	mockProfiles,
	mockCurrentUser,
	generateMoreProfiles,
	availableTags,
	getRandomProfile,
	getProfilesBatch,
} from './lib/mockData'

// Mock Actions
export {
	mockLogin,
	mockRegister,
	mockFetchProfiles,
	mockLoadMoreProfiles,
	mockSwipeProfile,
	mockUpdateProfile,
	mockUploadPhoto,
	mockGetRecommendations,
	mockSyncData,
	mockGetUserStats,
	mockRealtimeUpdates,
} from './lib/mockActions'
