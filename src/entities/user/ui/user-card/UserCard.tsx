import type { User } from '../../types'
import Info from '@/assets/icons/info.svg?react'

type Props = {
	user: User
}

export const UserCard = ({ user }: Props) => {
	return (
		<div className='aspect-[366/671] rounded-lg relative overflow-hidden'>
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
	)
}
