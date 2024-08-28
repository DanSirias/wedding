import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const SignOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the session storage or any other storage where the tokens are stored
    sessionStorage.removeItem('id_token');
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');

    // AWS Cognito sign-out URL
    const cognitoDomain = 'YOUR_COGNITO_DOMAIN'; // e.g., your-app.auth.us-east-1.amazoncognito.com
    const clientId = 'YOUR_CLIENT_ID'; // Your Cognito User Pool client ID
    const logoutUrl = `https://${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${window.location.origin}`;

    // Redirect to AWS Cognito logout URL
    window.location.href = logoutUrl;
  }, [navigate]);

  return (
    <div>
      <h1>Signing you out...</h1>
    </div>
  );
};
