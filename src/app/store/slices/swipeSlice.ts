import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type {
	SwipeState,
	SwipeAction,
	Match,
	Like,
} from '../../../shared/types'

interface ExtendedSwipeState extends SwipeState {
	matches: Match[]
	likes: Like[]
	superlikes: Like[]
	dislikes: string[] // ID профилей, которые дизлайкнули
	isAnimating: boolean
	animationType: 'swipe-left' | 'swipe-right' | 'swipe-up' | null
	canUndo: boolean
	lastAction: SwipeAction | null
}

const initialState: ExtendedSwipeState = {
	currentProfileIndex: 0,
	profiles: [],
	swipeHistory: [],
	isLoading: false,
	hasMore: true,
	matches: [],
	likes: [],
	superlikes: [],
	dislikes: [],
	isAnimating: false,
	animationType: null,
	canUndo: false,
	lastAction: null,
}

const swipeSlice = createSlice({
	name: 'swipe',
	initialState,
	reducers: {
		// Основные действия свайпа
		swipeLeft: (state, action: PayloadAction<string>) => {
			const profileId = action.payload
			const swipeAction: SwipeAction = {
				profileId,
				action: 'dislike',
				timestamp: new Date().toISOString(),
			}

			state.swipeHistory.push(swipeAction)
			state.dislikes.push(profileId)
			state.lastAction = swipeAction
			state.canUndo = true
			state.animationType = 'swipe-left'
			state.isAnimating = true

			// Переходим к следующему профилю
			if (state.currentProfileIndex < state.profiles.length - 1) {
				state.currentProfileIndex += 1
			}
		},

		swipeRight: (
			state,
			action: PayloadAction<{ profileId: string; isMatch?: boolean }>
		) => {
			const { profileId, isMatch = false } = action.payload
			const swipeAction: SwipeAction = {
				profileId,
				action: 'like',
				timestamp: new Date().toISOString(),
			}

			state.swipeHistory.push(swipeAction)

			const like: Like = {
				id: `like_${Date.now()}`,
				fromUserId: 'current_user', // В реальном приложении берем из auth state
				toUserId: profileId,
				isSuper: false,
				createdAt: new Date().toISOString(),
			}

			state.likes.push(like)
			state.lastAction = swipeAction
			state.canUndo = true
			state.animationType = 'swipe-right'
			state.isAnimating = true

			// Если это мэтч, добавляем в мэтчи
			if (isMatch) {
				// В реальном приложении мэтч создается на бэкенде
				// Здесь просто добавляем заглушку
			}

			// Переходим к следующему профилю
			if (state.currentProfileIndex < state.profiles.length - 1) {
				state.currentProfileIndex += 1
			}
		},

		swipeUp: (
			state,
			action: PayloadAction<{ profileId: string; isMatch?: boolean }>
		) => {
			const { profileId, isMatch = false } = action.payload
			const swipeAction: SwipeAction = {
				profileId,
				action: 'superlike',
				timestamp: new Date().toISOString(),
			}

			state.swipeHistory.push(swipeAction)

			const superlike: Like = {
				id: `superlike_${Date.now()}`,
				fromUserId: 'current_user',
				toUserId: profileId,
				isSuper: true,
				createdAt: new Date().toISOString(),
			}

			state.superlikes.push(superlike)
			state.lastAction = swipeAction
			state.canUndo = true
			state.animationType = 'swipe-up'
			state.isAnimating = true

			// Переходим к следующему профилю
			if (state.currentProfileIndex < state.profiles.length - 1) {
				state.currentProfileIndex += 1
			}
		},

		// Отмена последнего действия
		undoLastSwipe: state => {
			if (!state.canUndo || !state.lastAction) return

			const lastAction = state.lastAction

			// Удаляем последнее действие из истории
			state.swipeHistory.pop()

			// Возвращаемся к предыдущему профилю
			if (state.currentProfileIndex > 0) {
				state.currentProfileIndex -= 1
			}

			// Удаляем из соответствующего массива
			switch (lastAction.action) {
				case 'dislike':
					const dislikeIndex = state.dislikes.indexOf(lastAction.profileId)
					if (dislikeIndex > -1) {
						state.dislikes.splice(dislikeIndex, 1)
					}
					break
				case 'like':
					const likeIndex = state.likes.findIndex(
						(like: Like) =>
							like.toUserId === lastAction.profileId && !like.isSuper
					)
					if (likeIndex > -1) {
						state.likes.splice(likeIndex, 1)
					}
					break
				case 'superlike':
					const superlikeIndex = state.superlikes.findIndex(
						(like: Like) => like.toUserId === lastAction.profileId
					)
					if (superlikeIndex > -1) {
						state.superlikes.splice(superlikeIndex, 1)
					}
					break
			}

			state.lastAction =
				state.swipeHistory[state.swipeHistory.length - 1] || null
			state.canUndo = false
		},

		// Добавление мэтча
		addMatch: (state, action: PayloadAction<Match>) => {
			state.matches.push(action.payload)
		},

		// Управление анимацией
		setAnimating: (state, action: PayloadAction<boolean>) => {
			state.isAnimating = action.payload
			if (!action.payload) {
				state.animationType = null
			}
		},

		setAnimationType: (
			state,
			action: PayloadAction<'swipe-left' | 'swipe-right' | 'swipe-up' | null>
		) => {
			state.animationType = action.payload
		},

		// Сброс состояния анимации
		resetAnimation: state => {
			state.isAnimating = false
			state.animationType = null
		},

		// Управление состоянием
		setCurrentProfileIndex: (state, action: PayloadAction<number>) => {
			state.currentProfileIndex = action.payload
		},

		setCanUndo: (state, action: PayloadAction<boolean>) => {
			state.canUndo = action.payload
		},

		setHasMore: (state, action: PayloadAction<boolean>) => {
			state.hasMore = action.payload
		},

		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload
		},

		// Очистка данных
		clearSwipeHistory: state => {
			state.swipeHistory = []
			state.lastAction = null
			state.canUndo = false
		},

		clearMatches: state => {
			state.matches = []
		},

		clearLikes: state => {
			state.likes = []
			state.superlikes = []
		},

		clearDislikes: state => {
			state.dislikes = []
		},

		resetSwipeState: state => {
			return { ...initialState }
		},

		// Получение статистики
		getSwipeStats: state => {
			const totalSwipes = state.swipeHistory.length
			const likes = state.swipeHistory.filter(
				(action: SwipeAction) => action.action === 'like'
			).length
			const superlikes = state.swipeHistory.filter(
				(action: SwipeAction) => action.action === 'superlike'
			).length
			const dislikes = state.swipeHistory.filter(
				(action: SwipeAction) => action.action === 'dislike'
			).length

			// Статистика сохраняется в lastAction временно для доступа из компонентов
			state.lastAction = {
				profileId: 'stats',
				action: 'like',
				timestamp: JSON.stringify({
					totalSwipes,
					likes,
					superlikes,
					dislikes,
					matches: state.matches.length,
				}),
			}
		},
	},
})

export const {
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
	setHasMore,
	setLoading,
	clearSwipeHistory,
	clearMatches,
	clearLikes,
	clearDislikes,
	resetSwipeState,
	getSwipeStats,
} = swipeSlice.actions

export default swipeSlice.reducer
