import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Cookies from 'js-cookie';

import './Css/App.css';
import HomePage from './Home/Hero';
import InfoPage from './Info/InfoPage';
import LoginPage from './Login/LoginPage';

export default function App() {
  const googleClientId = '431849677311-5772dih05s9a1m8ap2l50mcche574j3p.apps.googleusercontent.com';
  const [userInfo, setUserInfo] = useState(null);

  // Retrieve user info from cookies on component mount
  useEffect(() => {
    const storedUserInfo = Cookies.get('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  // Logout handler
  const handleLogout = () => {
    Cookies.remove('userInfo'); // Remove cookie
    setUserInfo(null); // Clear user info from state
  };

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/login" element={<LoginPage userInfo={userInfo} setUserInfo={setUserInfo} handleLogout={handleLogout} />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);