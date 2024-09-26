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
    return <Navigate to="https://siriaswedding.auth.us-east-1.amazoncognito.com/login?client_id=5bfvpm9fvjgbh5c2s32oiv9d6h&response_type=token&scope=email+openid+phone+profile&redirect_uri=https%3A%2F%2Fwww.siriaswedding.com%2Fdashboard" replace />;
  }

  // Otherwise, render the protected component
  return <>{element}</>;
};

export default ProtectedRoute;
