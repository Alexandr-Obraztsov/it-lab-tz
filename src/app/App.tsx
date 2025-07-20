import { RouterProvider, StoreProvider } from './providers'

function App() {
	return (
		<StoreProvider>
			<RouterProvider />
		</StoreProvider>
	)
}

export default App
