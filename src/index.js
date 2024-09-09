import React from 'react';
import ReactDOM from 'react-dom/client';
import './Css/index.css';
import App from './App';

// Function to update the data-theme attribute based on dark mode
const updateTheme = () => {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const html = document.documentElement;

  if (prefersDarkMode) {
    html.setAttribute('data-theme', 'forest');
  } else {
    html.removeAttribute('data-theme');
  }
};

// Update theme on page load
updateTheme();

// Optionally, listen for changes to the user's color scheme preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme);

// Google OAuth Client ID
// const googleClientId = '431849677311-5772dih05s9a1m8ap2l50mcche574j3p.apps.googleusercontent.com';  // Replace with your actual Client ID

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
