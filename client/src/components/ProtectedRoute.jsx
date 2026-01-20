import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (!userInfo) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(userInfo.role)) {
        return <Navigate to="/dashboard" replace />; // Redirect to their own dashboard if unauthorized
    }

    return <Outlet />;
};

export default ProtectedRoute;
