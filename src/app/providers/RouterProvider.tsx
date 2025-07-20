import { HomePage } from '@/pages/home'
import type { PropsWithChildren } from 'react'
import { BrowserRouter, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
	},
])

export const RouterProvider = ({ children }: PropsWithChildren) => {
	return <BrowserRouter></BrowserRouter>
}
