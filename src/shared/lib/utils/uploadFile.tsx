import type { Nullable } from '@/shared/types'

export const uploadFile = async (
	accept: string,
	onSelect: (file: Nullable<File>) => void
) => {
	const input = document.createElement('input')
	input.type = 'file'
	input.accept = accept
	input.onchange = e => {
		const file = (e.target as HTMLInputElement).files?.[0]
		onSelect(file)
	}
	input.click()
}
