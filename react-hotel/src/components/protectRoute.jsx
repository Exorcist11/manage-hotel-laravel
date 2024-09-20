import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ element, isAuthenticated, requiredRole }) => {
    const user = localStorage.getItem("user");

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" />;
    }

    return element;
};
