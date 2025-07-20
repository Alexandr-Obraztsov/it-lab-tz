import { Progress } from './progress/Progress'
import { NameStep } from './steps/name/NameStep'
import { PassionsStep } from './steps/passions/PassionsStep'
import { PhotosStep } from './steps/photos/PhotosStep'
import { useState } from 'react'
import type { Profile } from '@/shared/types'
import { RegistrationContext } from '../model/RegistrationContext'

const steps = [<NameStep />, <PassionsStep />, <PhotosStep />]

export const RegistrationPage = () => {
	const [step, setStep] = useState(0)
	const [formData, setFormData] = useState<Profile>({
		username: '',
		passions: [],
		photos: [],
	})

	const handleNext = () => {
		if (step < steps.length - 1) setStep(step + 1)
		else {
			console.log(formData)
		}
	}

	const handleBack = () => {
		if (step > 0) setStep(step - 1)
	}

	return (
		<div className='h-screen overflow-hidden max-w-2xl mx-auto flex flex-col'>
			<Progress current={step + 1} max={3} />
			<RegistrationContext.Provider
				value={{ step, formData, setFormData, handleNext, handleBack }}
			>
				{steps[step]}
			</RegistrationContext.Provider>
		</div>
	)
}
