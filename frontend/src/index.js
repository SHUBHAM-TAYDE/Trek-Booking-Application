// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client' for React 18
import './index.css'; // You might have a global CSS file here
import App from './App'; // Import your main App component
import reportWebVitals from './reportWebVitals'; // For performance metrics (optional)

// Get the root DOM element where the React app will be mounted
const rootElement = document.getElementById('root');

// Create a root and render your App component
// This is the modern way to render React 18 applications
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();