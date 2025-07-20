import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type AuthState, type User } from '../../../shared/types'

const initialState: AuthState = {
	isAuthenticated: false,
	token: null,
	refreshToken: null,
	user: null,
	isLoading: false,
	error: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginStart: state => {
			state.isLoading = true
			state.error = null
		},
		loginSuccess: (
			state,
			action: PayloadAction<{ token: string; refreshToken: string; user: User }>
		) => {
			state.isLoading = false
			state.isAuthenticated = true
			state.token = action.payload.token
			state.refreshToken = action.payload.refreshToken
			state.user = action.payload.user
			state.error = null
		},
		loginFailure: (state, action: PayloadAction<string>) => {
			state.isLoading = false
			state.isAuthenticated = false
			state.token = null
			state.refreshToken = null
			state.user = null
			state.error = action.payload
		},
		logout: state => {
			state.isAuthenticated = false
			state.token = null
			state.refreshToken = null
			state.user = null
			state.error = null
			state.isLoading = false
		},
		clearError: state => {
			state.error = null
		},
		updateUser: (state, action: PayloadAction<Partial<User>>) => {
			if (state.user) {
				state.user = { ...state.user, ...action.payload }
			}
		},
		setToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload
		},
	},
})

export const {
	loginStart,
	loginSuccess,
	loginFailure,
	logout,
	clearError,
	updateUser,
	setToken,
} = authSlice.actions

export default authSlice.reducer
