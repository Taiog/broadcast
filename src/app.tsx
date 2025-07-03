import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './apps/auth/contexts/Auth'
import { AppRoutes } from './routes'

export function App() {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <AppRoutes />
            </AuthContextProvider>
        </BrowserRouter>
    )
}