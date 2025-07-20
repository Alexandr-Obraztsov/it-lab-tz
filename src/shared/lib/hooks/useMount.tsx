import { useEffect, useState } from 'react'

export const useMount = (callback?: () => void) => {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		if (!isMounted) {
			callback?.()
			setIsMounted(true)
		}
	}, [])

	return isMounted
}
