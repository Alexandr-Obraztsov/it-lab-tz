import React from 'react'
import { cn } from '../../lib/utils/cn'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	error?: string
}

export const Input: React.FC<InputProps> = ({ error, className, ...props }) => {
	return (
		<div className='w-full'>
			<div className='relative'>
				<input
					className={cn(
						// Базовые стили
						'w-full transition-all duration-200 focus:outline-none border border-border rounded-lg bg-foreground text-primary text-[17px] leading-[24px] py-3 px-[14px]',
						error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
						className
					)}
					{...props}
				/>
			</div>

			{error && (
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
				</div>
			)}
		</div>
	)
}
