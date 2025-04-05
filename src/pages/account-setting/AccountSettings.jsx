import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AccountSettings.css';

function AccountSettings() {
  const navigate = useNavigate();
  const storedProfile = JSON.parse(localStorage.getItem('userProfile'));
  const profilePhoto = storedProfile?.profilePhoto || null;

  // Navigate to create-account page
  const handleEditClick = () => {
    navigate('/create-account');
  };

  // Logout and navigate to landing page
  const handleLogoutClick = () => {
    localStorage.removeItem('userProfile'); // Optional: clear user session
    navigate('/');
  };

  return (
    <div className="account-settings-wrapper">
      <div className="account-settings-container">
        <div className="account-settings-content">
          <h1 className="account-settings-title">Account Settings</h1>
          
          <div className="profile-section">
            <div className="profile-image">
              {profilePhoto ? (
                <img src={profilePhoto} alt="Profile" className="profile-photo" />
              ) : (
                <div className="image-placeholder">👤</div>
              )}
            </div>
            
            <div className="profile-info">
              <div className="profile-name">{storedProfile?.fullName || 'Marry Doe'}</div>
              <div className="profile-email">{storedProfile?.email || 'Marry@Gmail.Com'}</div>
            </div>
          </div>
          
          <div className="profile-description">
            Lorem Ipsum Dolor Sit Amet.Consectetur S adipiscing
            Elit.Sed Diam Nonumy Eirmod Tempor Invidunt Ut
            Labore Et Dolore Magna Aliquyam Erat.Sed Diam
          </div>
          
          <div className="action-buttons">
            <button className="edit-profile-btn" onClick={handleEditClick}>
              Edit Profile
            </button>
            <button className="logout-btn" onClick={handleLogoutClick}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
