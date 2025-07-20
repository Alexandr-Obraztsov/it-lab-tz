import { StoreProvider } from './StoreProvider'
import { RouterProvider } from './RouterProvider'

export const AppProvider = () => {
	return (
		<StoreProvider>
			<RouterProvider />
		</StoreProvider>
	)
}
