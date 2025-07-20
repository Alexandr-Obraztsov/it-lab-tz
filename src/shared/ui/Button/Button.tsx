import React from 'react'
import { cn } from '../../lib/utils'

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
	size?: 'sm' | 'md' | 'lg'
	isLoading?: boolean
	children: React.ReactNode
}

const buttonVariants = {
	primary:
		'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg hover:from-pink-600 hover:to-orange-600 active:scale-95',
	secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 active:scale-95',
	outline:
		'border-2 border-pink-500 text-pink-500 bg-transparent hover:bg-pink-50 active:scale-95',
	ghost: 'text-gray-600 hover:bg-gray-100 active:scale-95',
}

const buttonSizes = {
	sm: 'px-4 py-2 text-sm',
	md: 'px-6 py-3 text-base',
	lg: 'px-8 py-4 text-lg',
}

export const Button: React.FC<ButtonProps> = ({
	variant = 'primary',
	size = 'md',
	isLoading = false,
	disabled,
	className,
	children,
	...props
}) => {
	return (
		<button
			className={cn(
				// Базовые стили
				'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2',
				// Варианты
				buttonVariants[variant],
				// Размеры
				buttonSizes[size],
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
