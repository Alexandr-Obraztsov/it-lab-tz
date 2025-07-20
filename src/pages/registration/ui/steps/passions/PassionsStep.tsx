import Back from '@/assets/icons/back.svg?react'
import { RegistrationContext } from '@/pages/registration/model/RegistrationContext'
import { Button } from '@/shared/ui'
import { useContext } from 'react'
import { passions } from '@/pages/registration/consts/passions'

export const PassionsStep = () => {
	const { handleBack, handleNext } = useContext(RegistrationContext)

	return (
		<div className='h-full overflow-hidden flex flex-col'>
			<div className='pt-[17px] px-6 pb-6 border-b border-border'>
				<div className='flex items-center justify-between'>
					<Back className='text-gray-200' onClick={handleBack} />
					<Button variant='ghost' onClick={handleNext}>
						Skip
					</Button>
				</div>
				<h1 className='text-primary text-[28px] leading-[36px] font-bold mt-[17px]'>
					Passions
				</h1>
				<p className='text-secondary text-[17px] leading-[24px] mt-[7px]'>
					Let everyone know what you’re passionate about, by adding it to your
					profile.
				</p>
			</div>
			<div className='h-0 grow py-5 px-6 flex flex-wrap gap-2 justify-center overflow-y-auto'>
				{passions.map((passion, id) => (
					<div
						key={id}
						className='px-[13px] pt-1 pb-1.5 rounded-full border border-border'
					>
						{passion}
					</div>
				))}
			</div>
			<div className='p-4 bg-background border-t border-border'>
				<Button className='w-full'>Continue</Button>
			</div>
		</div>
	)
}
