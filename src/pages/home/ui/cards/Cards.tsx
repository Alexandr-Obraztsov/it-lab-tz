import { selectUsers } from '@/app/store/slices/usersSlice'
import { UserCard } from '@/entities/user'
import { useAppSelector } from '@/shared/lib'
import React from 'react'
import { useMemo } from 'react'
import TinderCard from 'react-tinder-card'

export const Cards = () => {
	const users = useAppSelector(selectUsers)
	const onCardLeft = (direction: 'left' | 'right' | 'up' | 'down') => {
		// отправляем запрос на сервер
		console.log(direction)
	}

	const childRefs = useMemo(
		() =>
			Array(users.length)
				.fill(0)
				.map(i => React.createRef<unknown>()),
		[]
	)

	const swipe = async (index: number, direction: 'left' | 'right') => {
		if (!childRefs[index].current) return
		const card = childRefs[index].current as {
			swipe: (direction: 'left' | 'right') => Promise<void>
		}
		await card.swipe(direction)
	}

	return (
		<div className='grow mx-auto w-full relative max-w-md'>
			{users.map((user, index) => (
				<TinderCard
					ref={childRefs[index] as any}
					key={user.id}
					onCardLeftScreen={onCardLeft}
					preventSwipe={['down', 'up']}
					flickOnSwipe={true}
					className='absolute w-full h-full px-1'
				>
					<UserCard
						key={user.id}
						user={user}
						actions={{
							onRetry: () => swipe(index, 'right'),
							onLike: () => swipe(index, 'right'),
							onDislike: () => swipe(index, 'left'),
							onStar: () => swipe(index, 'right'),
							onEnergy: () => swipe(index, 'right'),
						}}
					/>
				</TinderCard>
			))}
			<div className='w-full h-full flex justify-center items-center'>
				На сегодня все :(
			</div>
		</div>
	)
}
