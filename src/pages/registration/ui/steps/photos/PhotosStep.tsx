import { cn } from '@/shared/lib'
import { useContext, useState } from 'react'
import { EditTab } from './tabs/edit/EditTab'
import { PreviewTab } from './tabs/preview/PreviewTab'
import { RegistrationContext } from '@/pages/registration/model/RegistrationContext'

export const PhotosStep = () => {
	const {
		formData: { photos },
	} = useContext(RegistrationContext)

	const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')

	const handleTabChange = (tab: 'edit' | 'preview') => () => {
		setActiveTab(tab)
	}

	const renderedTab = activeTab === 'edit' ? <EditTab /> : <PreviewTab />

	return (
		<div className='pt-[38px] h-full overflow-hidden flex flex-col'>
			{/* Tabs */}
			<div className='flex items-center border-b border-border'>
				<button
					className={cn(
						'grow transition-colors duration-300 border-r border-border h-[50px] text-[19px] leading-[26px] font-bold text-secondary',
						activeTab === 'edit' && 'text-chip-2'
					)}
					onClick={handleTabChange('edit')}
				>
					Edit
				</button>
				<button
					className={cn(
						'grow transition-[colors,opacity] duration-300 h-[50px] text-[19px] leading-[26px] font-bold text-secondary disabled:opacity-60',
						activeTab === 'preview' && 'text-chip-2'
					)}
					onClick={handleTabChange('preview')}
					disabled={!photos.length}
				>
					Preview
				</button>
			</div>

			{/* Tabs content */}
			<div className='grow overflow-y-auto'>{renderedTab}</div>
		</div>
	)
}
