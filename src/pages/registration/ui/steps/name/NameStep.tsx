import { Input, Button } from '@/shared/ui'
import CloseIcon from '@/assets/icons/close.svg?react'
import { useContext, useEffect, useState, type ChangeEvent } from 'react'
import { RegistrationContext } from '../../../model/RegistrationContext'

export const NameStep = () => {
	const { formData, setFormData, handleNext } = useContext(RegistrationContext)
	const [username, setUsername] = useState('')

	const handleClick = () => {
		setFormData({ ...formData, username })
		handleNext()
	}

	const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value.trim())
	}

	useEffect(() => {
		setUsername(formData.username)
	}, [formData.username])

	return (
		<div className='pt-4 px-6'>
			<CloseIcon className='text-gray-200' />
			<h1 className='text-primary text-[28px] leading-[36px] font-bold mt-[15px]'>
				My first name is
			</h1>
			<Input
				placeholder='Enter your first name'
				className='mt-9'
				value={username}
				onChange={handleChangeName}
			/>
			<p className='mt-[23px] text-[15px] text-secondary font-medium leading-[20px]'>
				This is how it will appear in Tinder.
			</p>
			<Button className='w-full' onClick={handleClick} disabled={!username}>
				Continue
			</Button>
		</div>
	)
}
