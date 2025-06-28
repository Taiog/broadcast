import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PublicRoute = () => {
    const { user, loading } = useAuth();

    if (loading) return <div className="text-center mt-10">Carregando...</div>;

    return !user ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default PublicRoute;
