import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authContext';  // The context we created earlier

// Update the ProtectedRouteProps by removing `path` since it's not needed
interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the protected component
  return <>{element}</>;
};

export default ProtectedRoute;
