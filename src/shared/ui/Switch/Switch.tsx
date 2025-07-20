import { cn } from '@/shared/lib/utils/cn'
import React from 'react'

export type SwitchProps = {
	checked?: boolean
	onCheckedChange?: (checked: boolean) => void
	disabled?: boolean
	className?: string
}

export const Switch = ({
	checked = false,
	onCheckedChange,
	disabled = false,
	className,
}: SwitchProps) => {
	const handleToggle = () => {
		if (!disabled && onCheckedChange) {
			onCheckedChange(!checked)
		}
	}

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === ' ' || event.key === 'Enter') {
			event.preventDefault()
			handleToggle()
		}
	}

	return (
		<div className={cn('flex items-center gap-3', className)}>
			<button
				type='button'
				role='switch'
				aria-checked={checked}
				data-state={checked ? 'checked' : 'unchecked'}
				disabled={disabled}
				className={cn(
					'inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chip-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
					'w-12 h-7	',
					checked ? 'bg-gradient-to-r from-chip-2 to-accent' : 'bg-gray-200',
					disabled && 'opacity-50'
				)}
				onClick={handleToggle}
				onKeyDown={handleKeyDown}
			>
				<span
					data-state={checked ? 'checked' : 'unchecked'}
					className={cn(
						'pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform',
						'size-7 border-1',
						checked
							? 'translate-x-5 border-chip-2'
							: '-translate-x-1 border-gray-200'
					)}
				/>
			</button>
		</div>
	)
}
