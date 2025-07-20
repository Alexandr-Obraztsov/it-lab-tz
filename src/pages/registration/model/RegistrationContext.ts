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
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	setFormData: (_: Profile) => {},
	handleNext: () => {},
	handleBack: () => {},
})
