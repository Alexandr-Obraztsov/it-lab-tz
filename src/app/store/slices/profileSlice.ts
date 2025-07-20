import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Profile } from '@shared/types'

const initialState: Profile = {
	username: '',
	passions: [],
	photos: [],
}

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		setProfile: (state, action: PayloadAction<Profile>) => {
			state = action.payload
		},
		updateProfile: (state, action: PayloadAction<Profile>) => {
			state = action.payload
		},
		updateBasicInfo: (state, action: PayloadAction<Profile>) => {
			state = action.payload
		},
	},
})

export const { setProfile, updateProfile, updateBasicInfo } =
	profileSlice.actions

export const profileReducer = profileSlice.reducer
