import { Progress } from './progress/Progress'
import { NameStep } from './steps/name/NameStep'
import { PassionsStep } from './steps/passions/PassionsStep'
import { PhotosStep } from './steps/photos/PhotosStep'
import { useState } from 'react'
import type { Profile } from '@/shared/types'
import { RegistrationContext } from '../model/RegistrationContext'
import { useAppDispatch } from '@/shared/lib'
import { setProfile } from '@/app/store/slices'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/consts'

const steps = [<NameStep />, <PassionsStep />, <PhotosStep />]

export const RegistrationPage = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const [step, setStep] = useState(0)
	const [formData, setFormData] = useState<Profile>({
		username: '',
		passions: [],
		photos: [],
	})

	const handleNext = () => {
		if (step < steps.length - 1) setStep(step + 1)
		else {
			// Отправляем на бек, получаем пользователя
			dispatch(setProfile(formData))
			navigate(ROUTES.HOME)
		}
	}

	const handleBack = () => {
		if (step > 0) setStep(step - 1)
	}

	return (
		<div className='h-screen overflow-hidden flex flex-col'>
			<Progress current={step + 1} max={3} />
			<RegistrationContext.Provider
				value={{ step, formData, setFormData, handleNext, handleBack }}
			>
				{steps[step]}
			</RegistrationContext.Provider>
		</div>
	)
}
