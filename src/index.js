import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { AuthProvider } from './config/AuthContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <AuthProvider >
    <App />
    </AuthProvider>
  </React.StrictMode>
);
