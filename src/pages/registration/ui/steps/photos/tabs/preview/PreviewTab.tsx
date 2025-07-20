import { UserCard } from '@/entities/user'
import { RegistrationContext } from '@/pages/registration/model/RegistrationContext'
import { useContext } from 'react'

export const PreviewTab = () => {
	const { formData } = useContext(RegistrationContext)
	return (
		<div className='h-full bg-foreground p-3'>
			<UserCard user={{ id: '', profile: formData }} />
		</div>
	)
}
