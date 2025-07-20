import { selectUsers } from '@/app/store/slices/usersSlice'
import { UserCard } from '@/entities/user'
import { useAppSelector } from '@/shared/lib'
import { Menu } from '@/widgets/menu'
import TinderCard from 'react-tinder-card'

export const HomePage = () => {
	const users = useAppSelector(selectUsers)

	return (
		<div className='h-screen flex flex-col'>
			<div className='grow flex flex-col justify-end px-1'>
				{users.map(user => (
					<TinderCard key={user.id} onSwipe={() => {}}>
						<UserCard key={user.id} user={user} />
					</TinderCard>
				))}
			</div>

			{/* Menu */}
			<Menu />
		</div>
	)
}
