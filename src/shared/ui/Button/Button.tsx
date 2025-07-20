import React from 'react'
import { cn } from '../../lib/utils'

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean
	children: React.ReactNode
	variant?: 'primary' | 'ghost'
}

export const Button: React.FC<ButtonProps> = ({
	isLoading = false,
	disabled,
	className,
	children,
	variant = 'primary',
	...props
}) => {
	return (
		<button
			className={cn(
				'inline-flex items-center justify-center rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-bold',
				variant === 'primary' &&
					'text-button bg-gradient-to-tr from-chip-2 to-accent pt-2 pb-2.5 px-4 text-[19px] leading-[26px] active:scale-97',
				variant === 'ghost' &&
					'bg-transparent text-secondary py-1.5 px-3 text-[15px] leading-[20px] active:scale-97',
				className
			)}
			disabled={disabled || isLoading}
			{...props}
		>
			{isLoading ? (
				<div className='flex items-center gap-2'>
					<div className='w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin' />
					<span>Загрузка...</span>
				</div>
			) : (
				children
			)}
		</button>
	)
}
