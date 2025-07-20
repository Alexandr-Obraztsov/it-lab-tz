import { HomePage } from '@/pages/home'
import { RegistrationPage } from '@/pages/registration'
import { ROUTES } from '@/shared/consts'
import {
	createBrowserRouter,
	Navigate,
	RouterProvider as Provider,
} from 'react-router-dom'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Navigate to={ROUTES.REGISTRATION} />,
	},
	{
		path: ROUTES.REGISTRATION,
		element: <RegistrationPage />,
	},
	{
		path: ROUTES.HOME,
		element: <HomePage />,
	},
])

export const RouterProvider = () => {
	return <Provider router={router} />
}
