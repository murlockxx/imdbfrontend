import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './AuthOptions.css'; // Create a CSS file for styling if needed

const AuthOptions = () => {
  const { t } = useTranslation();

  return (
    <div className="auth-options-container">
      <h2 className="welcome">{t('welcome')}</h2>
      <div className="auth-buttons">
        <Link to="/login" className="btn btn-secondary auth-btn">
          {t('login')}
        </Link>
        <div className="create-account-text">
          {t('createAccount')}
        </div>
        <Link to="/register" className="btn btn-primary auth-btn">
          {t('register')}
        </Link>
      </div>
    </div>
  );
};

export default AuthOptions;
