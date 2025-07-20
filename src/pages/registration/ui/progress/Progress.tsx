import { useMount } from '@/shared/lib'

type Props = {
	current: number
	max: number
}

export const Progress = ({ current, max }: Props) => {
	const isMounted = useMount()

	return (
		<div className='w-full h-2.5 bg-gray'>
			<div
				className='h-full bg-gradient-to-r from-accent to-chip-1 transition-width duration-300'
				style={{ width: `${isMounted ? (current / max) * 100 : 0}%` }}
			/>
		</div>
	)
}
