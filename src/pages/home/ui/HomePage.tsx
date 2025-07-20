import { Menu } from '@/widgets/menu'
import { Cards } from './cards/Cards'

export const HomePage = () => {
	return (
		<div className='h-screen flex flex-col pt-12'>
			{/* Cards */}
			<Cards />

			{/* Menu */}
			<Menu />
		</div>
	)
}
