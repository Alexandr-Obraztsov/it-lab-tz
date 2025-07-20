import { Button, Switch } from '@/shared/ui'
import { PhotoPlace } from './photo-place/PhotoPlace'
import { uploadFile } from '@/shared/lib/utils/uploadFile'
import { useContext, useState } from 'react'
import { RegistrationContext } from '@/pages/registration/model/RegistrationContext'

const MAX_PHOTOS_COUNT = 9

export const EditTab = () => {
	const { setFormData, formData, handleNext } = useContext(RegistrationContext)
	const [smartPhotos, setSmartPhotos] = useState(false)

	const handleClickPhoto = (index: number, isPhoto: boolean) => () => {
		if (isPhoto) {
			setFormData({
				...formData,
				photos: formData.photos.filter((_, i) => i !== index),
			})
		} else {
			uploadFile('image/*', file => {
				if (file) {
					setFormData({
						...formData,
						photos: [
							...formData.photos,
							{ url: URL.createObjectURL(file), id: index.toString() },
						],
					})
				}
			})
		}
	}
	return (
		<div className='h-full bg-foreground'>
			<div className='px-2 pt-2.5 grid grid-cols-3 gap-2 max-w-lg mx-auto'>
				{Array.from({ length: MAX_PHOTOS_COUNT }).map((_, index) => (
					<PhotoPlace
						key={index}
						onClick={handleClickPhoto(index, formData.photos.length > index)}
						src={formData.photos[index]?.url}
					/>
				))}
			</div>
			<p className='text-center text-secondary text-[15px] leading-[20px] font-medium pt-4'>
				Add a video, pic or Loop to get 4% closer to completing your profile and
				you may even get more Likes.
			</p>
			<Button
				className='block w-[312px] mx-auto mt-7'
				disabled={!formData.photos.length}
				onClick={handleNext}
			>
				Add media
			</Button>
			<div className='mt-7 bg-background px-4 py-3 border-b border-t border-border'>
				<div className='flex justify-between items-center max-w-2xl mx-auto'>
					<span className='text-primary text-[16px] leading-[21px]'>
						Smart Photos
					</span>
					<Switch checked={smartPhotos} onCheckedChange={setSmartPhotos} />
				</div>
			</div>
		</div>
	)
}
