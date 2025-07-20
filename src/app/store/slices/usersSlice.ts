import type { User } from '@/entities/user'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

const initialState: User[] = [
	{
		id: '1',
		profile: {
			username: 'John Doe',
			passions: ['reading', 'traveling'],
			photos: [
				{
					id: '1',
					url: 'https://img.freepik.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg?semt=ais_hybrid&w=740',
				},
				{
					id: '2',
					url: 'https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg',
				},
			],
		},
	},
	{
		id: '2',
		profile: {
			username: 'Jane Smith',
			passions: ['cooking', 'dancing'],
			photos: [
				{
					id: '3',
					url: 'https://images.panda.org/assets/images/pages/welcome/orangutan_1600x1000_279157.jpg',
				},
				{
					id: '4',
					url: 'https://media.istockphoto.com/id/693919162/photo/shiny-red.jpg?s=612x612&w=0&k=20&c=Amc00TK6jMWkBaBMhRpjNThrZUW8zcPfPnZzEoNX-LA=',
				},
			],
		},
	},
]

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUsers: (state, action: PayloadAction<User[]>) => {
			state = action.payload
		},
	},
})

export const { setUsers } = userSlice.actions

export const selectUsers = (state: RootState) => state.users

export const usersReducer = userSlice.reducer
