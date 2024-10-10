import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { RootState } from '../../services/store';
const ProtectedRoute: React.FC = () => {
  const isAuthorized = useSelector(
    (state: RootState) => state.user.isAuthorized
  );
  if (!isAuthorized) {
    return <Navigate to='/login' replace />;
  }
  return <Outlet />;
};
export default ProtectedRoute;
