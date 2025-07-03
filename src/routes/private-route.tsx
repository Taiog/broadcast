import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../apps/auth/hooks/use-auth";

export function PrivateRoute() {
    const { user, loading } = useAuth();

    if (loading) return <div className="text-center mt-10">Carregando...</div>;

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};