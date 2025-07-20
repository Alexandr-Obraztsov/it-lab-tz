import type { User } from '../../types'
import Info from '@/assets/icons/info.svg?react'
import Retry from '@/assets/icons/retry.svg?react'
import Dislike from '@/assets/icons/dislike.svg?react'
import Star from '@/assets/icons/star.svg?react'
import Energy from '@/assets/icons/energy.svg?react'
import Like from '@/assets/icons/like.svg?react'
import { cn } from '@/shared/lib'
import { useState } from 'react'

const buttons = [
	{
		icon: <Retry />,
		color: '#CD7105',
		size: 'small',
		action: 'onRetry',
	},
	{
		icon: <Dislike />,
		color: '#F3485B',
		size: 'big',
		action: 'onDislike',
	},
	{
		icon: <Star />,
		color: '#1786FF',
		size: 'small',
		action: 'onStar',
	},
	{
		icon: <Like />,
		color: '#199A6A',
		size: 'big',
		action: 'onLike',
	},
	{
		icon: <Energy />,
		color: '#BA52F5',
		size: 'small',
		action: 'onEnergy',
	},
]

type Props = {
	user: User
	actions?: {
		onLike?: () => void
		onDislike?: () => void
		onStar?: () => void
		onEnergy?: () => void
		onRetry?: () => void
	}
}

export const UserCard = ({ user, actions }: Props) => {
	const [photoIndex, setPhotoIndex] = useState(0)

	const handlePhotoClick = () => {
		console.log(photoIndex)
		setPhotoIndex(prev => (prev + 1) % user.profile.photos.length)
	}

	return (
		<div className={'rounded-lg overflow-hidden flex flex-col h-full max-w-md'}>
			<div className='relative flex-1 flex flex-col'>
				{/* Pagination */}
				<div className='absolute top-4 left-2.5 right-2.5 flex gap-1'>
					{user.profile.photos.map((_, i) => (
						<div
							key={i}
							className={cn('h-1 grow rounded-full bg-gray-200', {
								'bg-white': photoIndex === i,
							})}
						/>
					))}
				</div>

				{/* Images */}
				<img
					src={user.profile.photos[photoIndex].url}
					onClick={handlePhotoClick}
					className='w-full h-0 grow object-cover pressable'
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
			{actions && (
				<div className='bg-black flex justify-center items-center py-[13px] gap-6 shrink-0'>
					{buttons.map(({ size, color, icon, action }, i) => (
						<button
							key={i}
							className={cn(
								'rounded-full flex items-center justify-center pressable',
								{
									'size-12': size === 'small',
									'size-15': size === 'big',
								}
							)}
							style={{
								border: `1px solid ${color}`,
								color: color,
							}}
							onClick={actions[action as keyof typeof actions] || undefined}
						>
							{icon}
						</button>
					))}
				</div>
			)}
		</div>
	)
}
