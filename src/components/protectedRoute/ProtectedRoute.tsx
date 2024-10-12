import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from '../../services/store';

const ProtectedRoute: React.FC = () => {
  const { isAuthorized, loading } = useSelector((state) => state.user);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
