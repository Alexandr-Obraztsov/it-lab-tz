import { cn } from '@/shared/lib'
import CloseBoldIcon from '@assets/icons/close-bold.svg?react'
import PlusIcon from '@assets/icons/plus.svg?react'

type Props = {
	onClick: () => void
	src?: string
}

export const PhotoPlace = ({ onClick, src }: Props) => {
	return (
		<div
			className={cn(
				'h-[162px] bg-gray-100 rounded-lg border-4 border-border border-dashed relative',
				src && 'border-none'
			)}
			onClick={onClick}
		>
			{src && (
				<img
					className='w-full h-full object-cover rounded-lg'
					src={src}
					alt='Photo'
				/>
			)}
			<span
				className={cn(
					'absolute bottom-0 -right-0.5 block text-background p-2 rounded-full border',
					src
						? 'bg-gray-100 border-border text-gray-200'
						: 'bg-gradient-to-tr from-chip-2 to-accent border-background'
				)}
			>
				{src ? <CloseBoldIcon /> : <PlusIcon />}
			</span>
		</div>
	)
}
