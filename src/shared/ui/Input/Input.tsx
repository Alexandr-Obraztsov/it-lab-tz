import React from 'react'
import { cn } from '../../lib/utils'

export interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
	label?: string
	error?: string
	helperText?: string
	variant?: 'default' | 'underline' | 'filled'
	size?: 'sm' | 'md' | 'lg'
}

const inputVariants = {
	default:
		'border border-gray-300 rounded-lg bg-white focus:border-pink-500 focus:ring-pink-500',
	underline:
		'border-0 border-b-2 border-gray-300 rounded-none bg-transparent focus:border-pink-500 focus:ring-0 px-0',
	filled:
		'border-0 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-500',
}

const inputSizes = {
	sm: 'px-3 py-2 text-sm',
	md: 'px-4 py-3 text-base',
	lg: 'px-5 py-4 text-lg',
}

export const Input: React.FC<InputProps> = ({
	label,
	error,
	helperText,
	variant = 'default',
	size = 'md',
	className,
	id,
	...props
}) => {
	const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

	return (
		<div className='w-full'>
			{label && (
				<label
					htmlFor={inputId}
					className='block text-sm font-medium text-gray-700 mb-2'
				>
					{label}
				</label>
			)}

			<div className='relative'>
				<input
					id={inputId}
					className={cn(
						// Базовые стили
						'w-full transition-all duration-200 focus:outline-none',
						// Варианты
						inputVariants[variant],
						// Размеры
						inputSizes[size],
						// Состояние ошибки
						error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
						className
					)}
					{...props}
				/>
			</div>

			{(error || helperText) && (
				<div className='mt-2'>
					{error && (
						<p className='text-sm text-red-600 flex items-center gap-1'>
							<svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
								<path
									fillRule='evenodd'
									d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
									clipRule='evenodd'
								/>
							</svg>
							{error}
						</p>
					)}
					{helperText && !error && (
						<p className='text-sm text-gray-500'>{helperText}</p>
					)}
				</div>
			)}
		</div>
	)
}
