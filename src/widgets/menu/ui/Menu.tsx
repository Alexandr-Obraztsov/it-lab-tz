import Fire from '@assets/icons/fire.svg?react'
import Sections from '@assets/icons/sections.svg?react'
import Profile from '@assets/icons/profile.svg?react'
import Chat from '@assets/icons/chat.svg?react'
import Action from '@assets/icons/action.svg?react'
import { ROUTES } from '@/shared/consts'
import { useLocation } from 'react-router-dom'
import { cn } from '@/shared/lib'

const menuItems = [
	{
		icon: <Fire />,
		label: 'Home',
		href: ROUTES.HOME,
	},
	{
		icon: <Sections />,
		label: 'Sections',
		href: '/sections',
	},
	{
		icon: <Action />,
		label: 'Action',
		href: '/action',
	},
	{
		icon: <Chat />,
		label: 'Chat',
		href: '/chat',
	},
	{
		icon: <Profile />,
		label: 'Profile',
		href: '/profile',
	},
]

export const Menu = () => {
	const location = useLocation()
	const isActive = (href: string) => location.pathname.includes(href)
	return (
		<nav className='flex-none bg-background z-99'>
			<ul className='flex justify-around items-center w-full max-w-sm mx-auto'>
				{menuItems.map(item => (
					<li
						key={item.label}
						className={cn(
							'size-11 text-gray-200 flex items-center justify-center',
							isActive(item.href) && 'text-chip-2'
						)}
					>
						{item.icon}
					</li>
				))}
			</ul>
		</nav>
	)
}
