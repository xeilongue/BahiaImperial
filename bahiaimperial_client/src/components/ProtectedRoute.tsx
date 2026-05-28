import type { ReactNode } from 'react';
import { Navigate } from 'react-router'

interface ProtectedRouteProps {
    children: ReactNode | null;
}

const isAuthenticated = () => {
    const token = localStorage.getItem("jwtToken");
    return token !== null;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    if (isAuthenticated())
        return <>{children}</>;
    return <Navigate to="/" />;
}

export default ProtectedRoute;