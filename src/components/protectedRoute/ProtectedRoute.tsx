import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { RootState } from '../../services/store';
const ProtectedRoute: React.FC = () => {
  const { isAuthorized, loading } = useSelector(
    (state: RootState) => state.user
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
