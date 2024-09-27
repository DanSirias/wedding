import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/authContext';  // Import the useAuth hook
import { CircularProgress, Box, Typography } from '@mui/material';  // MUI Spinner

// Function to invoke the combined API Gateway call
async function invokeAPIGateway(accessToken: string) {
    const url = `https://eqlh2tuls9.execute-api.us-east-1.amazonaws.com/PROD/userAuth/?access_token=${encodeURIComponent(accessToken)}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Received data:', data);

            const userData = data.userData;
            const redirectUrl = data.redirectUrl;

            // Return userData and redirectUrl for further processing
            return { userData, redirectUrl };
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to set a cookie
function setCookie(name: string, value: string, minutes: number) {
    const d = new Date();
    d.setTime(d.getTime() + minutes * 60 * 1000);
    const expires = 'expires=' + d.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/`;
}

// Function to encode data to base64
function encodeData(data: any) {
    return btoa(JSON.stringify(data));
}

const Callback: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();  // Use the login function from AuthContext
    const [loading, setLoading] = useState(true);  // State to manage loading spinner

    useEffect(() => {
        // Main function to get access token, invoke the API, and set the cookie
        async function main() {
            try {
                const hashParams = new URLSearchParams(window.location.hash.substring(1));
                const accessToken = hashParams.get('access_token');

                if (!accessToken) {
                    throw new Error('No access token found in URL');
                }

                // Simulate processing time with a timeout (e.g., 5 seconds)
                setTimeout(async () => {
                    // Invoke the combined API Gateway call
                    const result = await invokeAPIGateway(accessToken);

                    if (result && result.userData) {
                        // Encode the token and user data before storing them in a cookie
                        const cookieValue = encodeData({ accessToken, userData: result.userData });

                        // Store the user session data in a cookie for 30 minutes
                        setCookie('userSession', cookieValue, 30);

                        console.log("cookie created"); 

                        // Call the login function from AuthContext to update the authentication state
                        login();

                        console.log("Login Func Updated")
                        // Redirect to the provided redirectUrl or fallback to '/dashboard'
                        const redirectUrl = result.redirectUrl || '/dashboard';
                        window.location.href = redirectUrl;
                    } else {
                        // Fallback to '/' if no result or user data is available
                        navigate('/');
                    }
                }, 5000);  // 5 seconds delay to simulate processing time

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
