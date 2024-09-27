import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/authContext';  
import { CircularProgress, Box, Typography } from '@mui/material';  

// Function to invoke the API Gateway call
async function invokeAPIGateway(accessToken: string) {
    const url = `https://eqlh2tuls9.execute-api.us-east-1.amazonaws.com/PROD/userAuth/?access_token=${encodeURIComponent(accessToken)}`;

    console.log("Invoking API with access token:", accessToken); // Log the token being sent

    try {
        const response = await fetch(url, {
            method: 'GET',
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Received data from API:', data); // Log the response from the API
            return data;
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

const Callback: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();  
    const [loading, setLoading] = useState(true);  

    useEffect(() => {
        // Main function to get access token, invoke the API, and set the cookie
        async function main() {
            try {
                // Parse the URL hash to extract the access token
                const hashParams = new URLSearchParams(window.location.hash.substring(1));
                const accessToken = hashParams.get('access_token');

                console.log("Extracted access token:", accessToken); // Log the extracted token

                if (!accessToken) {
                    throw new Error('No access token found in URL');
                }

                // Call the API Gateway
                const result = await invokeAPIGateway(accessToken);

                if (result) {
                    console.log('Result from API:', result);

                    // Call the login function from AuthContext to update the authentication state
                    login();

                    // Redirect to '/dashboard' or any provided redirectUrl
                    const redirectUrl = result.redirectUrl || '/dashboard';
                    window.location.href = redirectUrl;
                } else {
                    // Fallback to '/' if no result or user data is available
                    navigate('/');
                }
            } catch (error: any) {
                console.error('Error:', error.message);
            } finally {
                // Stop the loading spinner once processing is complete
                setLoading(false);
            }
        }

        main();
    }, [navigate, login]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            {loading ? (
                <>
                    <CircularProgress />
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Processing login...
                    </Typography>
                </>
            ) : (
                <Typography variant="h6">
                    Redirecting...
                </Typography>
            )}
        </Box>
    );
};

export default Callback;
