import React from 'react'

export interface IconProps {
	className?: string
	size?: number
}

export const PlusIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		className={className}
	>
		<line x1='12' y1='5' x2='12' y2='19' />
		<line x1='5' y1='12' x2='19' y2='12' />
	</svg>
)

export const CloseIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		className={className}
	>
		<line x1='18' y1='6' x2='6' y2='18' />
		<line x1='6' y1='6' x2='18' y2='18' />
	</svg>
)

export const HeartIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		className={className}
	>
		<path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
	</svg>
)

export const StarIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		className={className}
	>
		<polygon points='12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26' />
	</svg>
)

export const CameraIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		className={className}
	>
		<path d='M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z' />
		<circle cx='12' cy='13' r='4' />
	</svg>
)

export const EditIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		className={className}
	>
		<path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' />
		<path d='m18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z' />
	</svg>
)

export const ChevronLeftIcon: React.FC<IconProps> = ({
	className,
	size = 24,
}) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		className={className}
	>
		<polyline points='15,18 9,12 15,6' />
	</svg>
)

export const ChevronRightIcon: React.FC<IconProps> = ({
	className,
	size = 24,
}) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		className={className}
	>
		<polyline points='9,18 15,12 9,6' />
	</svg>
)

export const CheckIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		className={className}
	>
		<polyline points='20,6 9,17 4,12' />
	</svg>
)
