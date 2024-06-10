import React from 'react';
import { useUser } from '../components/UserContext'; // Correct import path
import { useTranslation } from 'react-i18next';
import './ProfilePage.css'; // Import the CSS file

function ProfilePage() {
  const { user } = useUser();
  const { t } = useTranslation();

  if (!user) {
    return (
      <div className="profile-page">
        <div className="login-message">{t('pleaseLoginMessage')}</div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <h1 className="profile-title">{t('profilePage')}</h1>
      <div className="profile-info">
        <p><strong>{t('name')}:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {user.country && <p><strong>{t('country')}:</strong> {user.country}</p>}
        {user.city && <p><strong>{t('city')}:</strong> {user.city}</p>}
      </div>
    </div>
  );
}

export default ProfilePage;
