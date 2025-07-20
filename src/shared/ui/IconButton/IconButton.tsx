import React from 'react'
import { cn } from '../../lib/utils'

export interface IconButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost'
	size?: 'sm' | 'md' | 'lg' | 'xl'
	icon: React.ReactNode
	isLoading?: boolean
}

const iconButtonVariants = {
	primary:
		'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg hover:from-pink-600 hover:to-orange-600',
	secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
	danger: 'bg-red-500 text-white hover:bg-red-600 shadow-lg',
	success: 'bg-green-500 text-white hover:bg-green-600 shadow-lg',
	ghost: 'text-gray-600 hover:bg-gray-100',
}

const iconButtonSizes = {
	sm: 'w-8 h-8 text-sm',
	md: 'w-10 h-10 text-base',
	lg: 'w-12 h-12 text-lg',
	xl: 'w-16 h-16 text-xl',
}

export const IconButton: React.FC<IconButtonProps> = ({
	variant = 'primary',
	size = 'md',
	icon,
	isLoading = false,
	disabled,
	className,
	...props
}) => {
	return (
		<button
			className={cn(
				// Базовые стили
				'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 active:scale-95',
				// Варианты
				iconButtonVariants[variant],
				// Размеры
				iconButtonSizes[size],
				className
			)}
			disabled={disabled || isLoading}
			{...props}
		>
			{isLoading ? (
				<div className='w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin' />
			) : (
				icon
			)}
		</button>
	)
}
