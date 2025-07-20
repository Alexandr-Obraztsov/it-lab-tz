import { selectUsers } from '@/app/store/slices/usersSlice'
import { UserCard } from '@/entities/user'
import { useAppSelector } from '@/shared/lib'
import { Menu } from '@/widgets/menu'
import TinderCard from 'react-tinder-card'

export const HomePage = () => {
	const users = useAppSelector(selectUsers)

	return (
		<div className='h-screen flex flex-col pt-12'>
			<div className='grow mx-auto w-full relative max-w-sm'>
				{users.map(user => (
					<TinderCard
						key={user.id}
						onSwipe={() => {}}
						preventSwipe={['down', 'up']}
						className='absolute w-full h-full px-1'
					>
						<UserCard key={user.id} user={user} withActions />
					</TinderCard>
				))}
			</div>

			{/* Menu */}
			<Menu />
		</div>
	)
}
