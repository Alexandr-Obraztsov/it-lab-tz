import type { User } from '../../types'
import Info from '@/assets/icons/info.svg?react'
import Retry from '@/assets/icons/retry.svg?react'
import Dislike from '@/assets/icons/dislike.svg?react'
import Star from '@/assets/icons/star.svg?react'
import Energy from '@/assets/icons/energy.svg?react'
import Like from '@/assets/icons/like.svg?react'
import { cn } from '@/shared/lib'

type Props = {
	user: User
	withActions?: boolean
}

export const UserCard = ({ user, withActions = false }: Props) => {
	const buttons = [
		{
			icon: <Retry />,
			color: '#CD7105',
			size: 'small',
		},
		{
			icon: <Dislike />,
			color: '#F3485B',
			size: 'big',
		},
		{
			icon: <Star />,
			color: '#1786FF',
			size: 'small',
		},
		{
			icon: <Like />,
			color: '#199A6A',
			size: 'big',
		},
		{
			icon: <Energy />,
			color: '#BA52F5',
			size: 'small',
		},
	]

	return (
		<div className={'rounded-lg overflow-hidden flex flex-col h-full'}>
			<div className='relative flex-1'>
				{/* Images */}
				<img
					src={user.profile.photos[0].url}
					className='w-full h-full object-cover'
				/>
				{/* User Info */}
				<div className='z-10 absolute bottom-6 right-4 left-4'>
					<div className='flex items-end justify-between text-white'>
						<span className='text-[26px] leading-[34px]'>
							<span className='font-bold text-[34px] leading-[42px]'>
								{user.profile.username}
							</span>{' '}
							23
						</span>
						<Info />
					</div>
					{user.profile.passions && (
						<div className='mt-2.5 flex gap-1 flex-wrap max-w-[80%] line-clamp-2'>
							{user.profile.passions.slice(0, 5).map((passion, i) => (
								<div
									key={i}
									className='px-3 py-1 border border-white text-white bg-gray-200/80 text-nowrap rounded-full'
								>
									{passion}
								</div>
							))}
						</div>
					)}
				</div>

				{/* Shadow */}
				<span className=' absolute bottom-0 right-0 left-0 h-50 bg-gradient-to-b from-transparent to-black'></span>
			</div>

			{/* Actions */}
			{withActions && (
				<div className='bg-black flex justify-center items-center py-[13px] gap-6 shrink-0'>
					{buttons.map((button, i) => (
						<button
							key={i}
							className={cn('rounded-full flex items-center justify-center', {
								'size-12': button.size === 'small',
								'size-15': button.size === 'big',
							})}
							style={{
								border: `1px solid ${button.color}`,
								color: button.color,
							}}
						>
							{button.icon}
						</button>
					))}
				</div>
			)}
		</div>
	)
}
