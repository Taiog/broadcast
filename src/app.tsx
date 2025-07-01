import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './contexts/Auth'
import AppRoutes from './routes'

function App() {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <AppRoutes />
            </AuthContextProvider>
        </BrowserRouter>
    )
}

export default App