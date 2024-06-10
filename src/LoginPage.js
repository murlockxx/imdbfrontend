import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { useUser } from './components/UserContext';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

const LoginPage = () => {
  const { setUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const allCookies = Cookies.get();
    console.log(allCookies);  // This will log all cookies to the console
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      setError(t('password'));
      return;
    }
  
    if (!email.includes('@')) {
      setError(t('validEmail'));
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8080/api/v1/user/login', {
        email,
        password
      }, {
        withCredentials: true
      });
  
      if (response.status === 200) {
        setError('');  // Clear previous errors
        setUser(response.data);  // Store user information in context
        navigate('/home');  // Navigate to home page on successful login
      }
    } catch (error) {
      setError(error.response?.data || 'Login failed');
      console.error("Login failed", error);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  useEffect(() => {
    if (window.location.pathname === '/auth/google/callback') {
      handleOAuth2Callback();
    }
  }, [navigate]);

  const handleOAuth2Callback = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/user/oauth2/callback/google', { withCredentials: true });
      if (response.data) {
        console.log("google data: ", response.data);
        setUser(response.data);  // Set user context
        navigate('/home');  // Navigate to home page
      }
    } catch (error) {
      console.error("OAuth2 Callback handling error", error);
      setError("Authentication failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <input
        className="login-input"
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="login-input"
        type="password"
        placeholder={t('password')}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="login-error">{error}</p>}
      <button className="login-btn" onClick={handleLogin}>{t('login')}</button>
      <button className="login-btn google" onClick={handleGoogleLogin}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 488 512" 
          style={{ width: '24px', height: '24px', margin: '0 5px' }} 
        >
          <path fill="#FFD43B" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
        </svg>
        Google
      </button>
    </div>
  );
};

export default LoginPage;
