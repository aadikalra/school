import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const GoogleLoginButton = () => {
  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      console.log('Authorization Code:', codeResponse.code);

      try {
        const tokens = await axios.post(
          'http://localhost:3001/auth/google',
          {
            code: codeResponse.code,
          }
        );
        console.log('Tokens:', tokens.data);
        // Handle successful token exchange
      } catch (error) {
        console.error('Token exchange error:', error);
        // Handle errors
      }
    },
    onError: (errorResponse) => {
      console.error('Google Login Error:', errorResponse);
      // Handle login errors
    },
  });

  return (
    <div>
      <button
        onClick={() => googleLogin()}
        className="btn flex items-center space-x-2 px-4 py-2 text-sm w-1/2"
      >
        <img
          src="https://img.icons8.com/color/48/000000/google-logo.png"
          alt="Google"
          className="w-4 h-4"
        />
        <span>Login with Google</span>
      </button>
    </div>
  );
};

export default GoogleLoginButton;
