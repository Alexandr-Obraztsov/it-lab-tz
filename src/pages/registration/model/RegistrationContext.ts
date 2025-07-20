import { createContext } from 'react'
import type { RegistrationContextType } from '../types'
import type { Profile } from '@/shared/types'

export const RegistrationContext = createContext<RegistrationContextType>({
	step: 0,
	formData: {
		username: '',
		passions: [],
		photos: [],
	},
	setFormData: (data: Profile) => {},
	handleNext: () => {},
	handleBack: () => {},
})
