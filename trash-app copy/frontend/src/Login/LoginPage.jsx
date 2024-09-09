import React, { useState } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const LoginPage = () => {
  const [userInfo, setUserInfo] = useState(null);

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      console.log('Authorization Code:', codeResponse.code);

      try {
        const response = await axios.post(
          'http://localhost:3001/auth/google',
          {
            code: codeResponse.code,
          }
        );

        console.log('Response Data:', response.data);
        setUserInfo(response.data.user); // Store user info in state
      } catch (error) {
        console.error('Token exchange error:', error);
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
              src="https://scontent-sjc3-1.xx.fbcdn.net/v/t39.30808-6/302135820_573862501202284_1984822792650753120_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=bj_tz_iSZcYQ7kNvgEHhAQE&_nc_ht=scontent-sjc3-1.xx&oh=00_AYCzZnzUJYhKKVKe_Nih5CNDeFun3HPxJG-j1D13_FI2HA&oe=66DC8616"
              alt="Nature"
              className="object-cover h-full w-full"
            />
          </div>

          {/* Form Section */}
          <div className="w-1/2 p-8 flex flex-col justify-center">
            <form className="space-y-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered w-full"
                />
              </div>
              <button className="btn btn-neutral w-full mt-4">Login</button>
            </form>

            {/* Social Login Buttons */}
            <div className="flex justify-between mt-6 space-x-1">
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

              {/* Login with Facebook */}
              <button className="btn flex items-center space-x-2 px-4 py-2 w-1/2">
                <img
                  src="https://img.icons8.com/color/48/000000/facebook-new.png"
                  alt="Facebook"
                  className="w-4 h-4"
                />
                <span>Facebook</span>
              </button>
            </div>

            {userInfo && (
              <div className="mt-4">
                <h2 className="text-xl font-bold">Welcome, {userInfo.name}!</h2>
                <img
                  src={userInfo.picture}
                  alt="User Profile"
                  className="w-16 h-16 rounded-full"
                />
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
