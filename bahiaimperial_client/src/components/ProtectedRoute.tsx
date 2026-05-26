import type { ReactNode } from 'react';
import { Navigate } from 'react-router'

interface ProtectedRouteProps {
    children: ReactNode | null;
}

const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !(token == null);
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    if (isAuthenticated())
        return <>{children}</>;
    return <Navigate to="/auth" />;
}

export default ProtectedRoute;