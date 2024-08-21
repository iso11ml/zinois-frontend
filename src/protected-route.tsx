import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './providers/auth-provider';

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/authentication" />;
  }

  return element;
};

export default ProtectedRoute;
