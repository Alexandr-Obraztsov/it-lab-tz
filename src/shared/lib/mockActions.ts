import { createAsyncThunk } from '@reduxjs/toolkit'
import { mockCurrentUser, mockProfiles, getProfilesBatch } from './mockData'
import type { User } from '../types'

// Имитация задержки сети
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Mock действия для аутентификации
export const mockLogin = createAsyncThunk(
	'auth/mockLogin',
	async ({ email, password }: { email: string; password: string }) => {
		await delay(1000) // Имитация запроса

		// Простая валидация
		if (email === 'demo@example.com' && password === 'demo123') {
			return {
				token: 'mock_jwt_token_' + Date.now(),
				refreshToken: 'mock_refresh_token_' + Date.now(),
				user: mockCurrentUser,
			}
		} else {
			throw new Error('Неверный email или пароль')
		}
	}
)

export const mockRegister = createAsyncThunk(
	'auth/mockRegister',
	async (userData: Partial<User>) => {
		await delay(1500) // Имитация запроса

		const newUser: User = {
			id: 'new_user_' + Date.now(),
			email: userData.email || '',
			name: userData.name || '',
			age: userData.age || 18,
			bio: userData.bio || '',
			photos: userData.photos || [],
			tags: userData.tags || [],
			preferences: userData.preferences || mockCurrentUser.preferences,
			location: userData.location || mockCurrentUser.location,
			isVerified: false,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		}

		return {
			token: 'mock_jwt_token_' + Date.now(),
			refreshToken: 'mock_refresh_token_' + Date.now(),
			user: newUser,
		}
	}
)

// Mock действия для профилей
export const mockFetchProfiles = createAsyncThunk(
	'profiles/mockFetch',
	async ({ count = 10, page = 1 }: { count?: number; page?: number }) => {
		await delay(800) // Имитация запроса

		if (page === 1) {
			return mockProfiles.slice(0, count)
		} else {
			return getProfilesBatch(count)
		}
	}
)

export const mockLoadMoreProfiles = createAsyncThunk(
	'profiles/mockLoadMore',
	async ({ count = 10 }: { count?: number }) => {
		await delay(600)
		return getProfilesBatch(count)
	}
)

// Mock действия для свайпов
export const mockSwipeProfile = createAsyncThunk(
	'swipe/mockSwipe',
	async ({
		profileId,
		action,
	}: {
		profileId: string
		action: 'like' | 'dislike' | 'superlike'
	}) => {
		await delay(300) // Имитация отправки на сервер

		// Имитация вероятности мэтча (25% для обычного лайка, 50% для суперлайка)
		const matchProbability =
			action === 'superlike' ? 0.5 : action === 'like' ? 0.25 : 0
		const isMatch = Math.random() < matchProbability

		return {
			profileId,
			action,
			isMatch,
			timestamp: new Date().toISOString(),
		}
	}
)

// Mock действия для обновления профиля пользователя
export const mockUpdateProfile = createAsyncThunk(
	'user/mockUpdate',
	async (updates: Partial<User>) => {
		await delay(500)
		return updates
	}
)

// Mock действия для загрузки фото
export const mockUploadPhoto = createAsyncThunk(
	'user/mockUploadPhoto',
	async (file: File) => {
		await delay(2000) // Имитация загрузки файла

		// Создаем mock URL для загруженного файла
		const mockUrl = URL.createObjectURL(file)

		return {
			id: 'photo_' + Date.now(),
			url: mockUrl,
			order: 0,
			isMain: false,
		}
	}
)

// Mock для получения рекомендаций
export const mockGetRecommendations = createAsyncThunk(
	'profiles/mockRecommendations',
	async ({
		ageRange,
		maxDistance,
		showMen,
		showWomen,
	}: {
		ageRange: { min: number; max: number }
		maxDistance: number
		showMen: boolean
		showWomen: boolean
	}) => {
		await delay(1000)

		// Фильтруем профили по параметрам
		const allProfiles = [...mockProfiles, ...getProfilesBatch(20)]

		const filteredProfiles = allProfiles.filter(profile => {
			const age = profile.user.age
			const distance = profile.distance || 0

			// Простая фильтрация по возрасту и расстоянию
			const ageMatch = age >= ageRange.min && age <= ageRange.max
			const distanceMatch = distance <= maxDistance

			return ageMatch && distanceMatch
		})

		// Перемешиваем и возвращаем
		const shuffled = filteredProfiles.sort(() => Math.random() - 0.5)
		return shuffled.slice(0, 15)
	}
)

// Mock для синхронизации данных
export const mockSyncData = createAsyncThunk('app/mockSync', async () => {
	await delay(500)

	return {
		lastSyncTime: new Date().toISOString(),
		newMatches: Math.floor(Math.random() * 3), // 0-2 новых мэтча
		newLikes: Math.floor(Math.random() * 5), // 0-4 новых лайка
	}
})

// Mock для получения статистики пользователя
export const mockGetUserStats = createAsyncThunk('user/mockStats', async () => {
	await delay(300)

	return {
		totalLikes: Math.floor(Math.random() * 100) + 50,
		totalMatches: Math.floor(Math.random() * 20) + 10,
		profileViews: Math.floor(Math.random() * 500) + 200,
		lastActiveDate: new Date().toISOString(),
	}
})

// Функции для имитации реального времени
export const mockRealtimeUpdates = {
	// Имитация получения нового лайка
	getNewLike: () => {
		const profiles = mockProfiles
		const randomProfile = profiles[Math.floor(Math.random() * profiles.length)]
		return {
			id: 'like_' + Date.now(),
			fromUserId: randomProfile.user.id,
			toUserId: mockCurrentUser.id,
			isSuper: Math.random() > 0.8,
			createdAt: new Date().toISOString(),
		}
	},

	// Имитация нового мэтча
	getNewMatch: () => {
		const profiles = mockProfiles
		const randomProfile = profiles[Math.floor(Math.random() * profiles.length)]
		return {
			id: 'match_' + Date.now(),
			profiles: [mockCurrentUser, randomProfile.user] as [User, User],
			messages: [],
			matchedAt: new Date().toISOString(),
			isActive: true,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		}
	},

	// Имитация обновления онлайн статуса
	getOnlineStatusUpdate: () => {
		const profiles = mockProfiles
		const randomProfile = profiles[Math.floor(Math.random() * profiles.length)]
		return {
			profileId: randomProfile.id,
			isOnline: Math.random() > 0.5,
			lastSeen: new Date().toISOString(),
		}
	},
}
