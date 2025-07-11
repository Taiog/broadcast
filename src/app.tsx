import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './apps/auth/contexts/Auth'
import { AppRoutes } from './core/routes'
import DialogApp from './components/dialog/dialog-app'

export function App() {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <DialogApp />
                <AppRoutes />
            </AuthContextProvider>
        </BrowserRouter>
    )
}