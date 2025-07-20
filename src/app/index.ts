// Store
export { store } from './store'
export type { RootState, AppDispatch } from './store'
export {
	selectAuth,
	selectUser,
	selectRegistration,
	selectProfiles,
	selectSwipe,
	selectCurrentUser,
	selectIsAuthenticated,
	selectCurrentProfile,
	selectRegistrationProgress,
	selectSwipeStats,
} from './store'

// Store Slices Actions
export {
	loginStart,
	loginSuccess,
	loginFailure,
	logout,
	clearError as clearAuthError,
	updateUser,
	setToken,
} from './store/slices/authSlice'

export {
	setProfile,
	updateProfile,
	updateBasicInfo,
	addPhoto as addUserPhoto,
	removePhoto as removeUserPhoto,
	setMainPhoto as setUserMainPhoto,
	reorderPhotos as reorderUserPhotos,
	updateTags as updateUserTags,
	addTag as addUserTag,
	removeTag as removeUserTag,
	updatePreferences,
	updateAgeRange as updateUserAgeRange,
	updateMaxDistance as updateUserMaxDistance,
	toggleShowMeOnTinder,
	updateDiscoverySettings,
	setEditing,
	setLoading as setUserLoading,
	setError as setUserError,
	clearError as clearUserError,
	clearProfile,
} from './store/slices/userSlice'

export {
	setCurrentStep,
	nextStep,
	prevStep,
	updateNameStep,
	updateTagsStep,
	addTag as addRegistrationTag,
	removeTag as removeRegistrationTag,
	addPhoto as addRegistrationPhoto,
	removePhoto as removeRegistrationPhoto,
	setMainPhoto as setRegistrationMainPhoto,
	reorderPhotos as reorderRegistrationPhotos,
	completeRegistration,
	resetRegistration,
} from './store/slices/registrationSlice'

export {
	setProfiles,
	addProfiles,
	removeProfile,
	nextProfile,
	prevProfile,
	setCurrentIndex,
	updateFilters,
	updateAgeRange as updateProfilesAgeRange,
	updateMaxDistance as updateProfilesMaxDistance,
	toggleShowMen,
	toggleShowWomen,
	setHasMore as setProfilesHasMore,
	setTotalProfiles,
	setLoading as setProfilesLoading,
	setError as setProfilesError,
	clearError as clearProfilesError,
	clearProfiles,
	updateProfileOnlineStatus,
	updateProfileDistance,
	shuffleProfiles,
} from './store/slices/profilesSlice'

export {
	swipeLeft,
	swipeRight,
	swipeUp,
	undoLastSwipe,
	addMatch,
	setAnimating,
	setAnimationType,
	resetAnimation,
	setCurrentProfileIndex,
	setCanUndo,
	setHasMore as setSwipeHasMore,
	setLoading as setSwipeLoading,
	clearSwipeHistory,
	clearMatches,
	clearLikes,
	clearDislikes,
	resetSwipeState,
	getSwipeStats,
} from './store/slices/swipeSlice'

// Providers
export { StoreProvider } from './providers/StoreProvider'
export { RouterProvider } from './providers/RouterProvider'
export { AppProvider } from './providers'
