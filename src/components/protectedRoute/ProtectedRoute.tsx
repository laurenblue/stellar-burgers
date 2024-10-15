import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

const ProtectedRoute: React.FC = () => {
  const { isAuthorized, loading } = useSelector((state) => state.user);
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    // Сохраняем маршрут в localStorage перед редиректом на логин
    localStorage.setItem('redirectPath', location.pathname);
    return <Navigate to='/login' />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
