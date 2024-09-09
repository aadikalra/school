import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Cookies from 'js-cookie';

const LoginPage = ({ userInfo, setUserInfo, handleLogout }) => {
  const googleLogin = useGoogleLogin({
    flow: 'implicit', // Use token flow
    onSuccess: async (tokenResponse) => {
      console.log('Access Token:', tokenResponse.access_token);

      try {
        const userInfoResponse = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`
        );
        console.log('User Info:', userInfoResponse.data);
        setUserInfo(userInfoResponse.data);

        // Store user info in a cookie that expires in 5 days
        Cookies.set('userInfo', JSON.stringify(userInfoResponse.data), { expires: 5 });
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    onError: (errorResponse) => {
      console.error('Google Login Error:', errorResponse);
    },
  });

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-base-200">
        <p className="mb-8 font-bold hover:cursor-pointer">
          <i className="fa-solid fa-plus mr-2"></i>
          Signup
        </p>
        <div className="bg-white shadow-lg overflow-hidden flex max-w-4xl">
          {/* Image Section */}
          <div className="w-1/2">
            <img
              src="https://i.ibb.co/2qk6G2h/image.png"
              alt="Nature"
              className="object-cover h-full w-full"
            />
          </div>

          {/* Form Section */}
          <div className="w-1/2 p-8 flex flex-col justify-center">
            {/* Login with Google */}
            <button
              className="btn flex items-center space-x-2 px-4 py-2 w-1/2"
              onClick={() => googleLogin()}
            >
              <img
                src="https://img.icons8.com/color/48/000000/google-logo.png"
                alt="Google"
                className="w-4 h-4"
              />
              <span>Google</span>
            </button>

            {userInfo && (
              <div className="mt-4">
                <h2 className="text-xl font-bold">Welcome, {userInfo.name}!</h2>
                <img
                  src={userInfo.picture}
                  alt="User Profile"
                  className="w-16 h-16 rounded-full"
                />
                <button onClick={handleLogout} className="btn mt-2">Logout</button>
              </div>
            )}

            <p className="text-right mt-4 text-sm">
              <a href="#">Login to existing account</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;