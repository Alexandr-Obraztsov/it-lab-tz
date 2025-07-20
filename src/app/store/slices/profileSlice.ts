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
		setProfile: (_, action: PayloadAction<Profile>) => action.payload,
		updateProfile: (state, action: PayloadAction<Partial<Profile>>) => ({
			...state,
			...action.payload,
		}),
	},
})

export const { setProfile, updateProfile } = profileSlice.actions

export const profileReducer = profileSlice.reducer
