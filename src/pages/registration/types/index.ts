import type { Profile } from '@/shared/types'

export type RegistrationContextType = {
	step: number
	formData: Profile
	setFormData: (data: Profile) => void
	handleNext: () => void
	handleBack: () => void
}
