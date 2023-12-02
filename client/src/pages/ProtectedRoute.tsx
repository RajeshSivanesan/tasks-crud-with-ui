import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Dashboard from "./Dashboard";

export const ProtectedRoute = () => {
    const { user, token } = useAuth() as any;
    if (!user && !token) {
        return <Navigate to="/" replace />;
    }
    return (
        <Dashboard />
    );
};