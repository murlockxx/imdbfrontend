import React from 'react';
import { useNavigate } from 'react-router-dom';

import './LogoutPage.css'; // Ensure this CSS file exists and is correctly styled
import { useUser } from '../components/UserContext';

const LogoutPage = () => {
    const navigate = useNavigate();
    const { setUser } = useUser();

    const handleLogout = () => {
        fetch('http://localhost:8080/api/v1/user/logout', {
            method: 'POST',
            credentials: 'include', // ensure cookies/session are sent
        })
        .then(response => {
            if (response.ok) {
                setUser(null); // Clears user context
                navigate('/login'); // Redirect using React Router
            } else {
                console.error('Failed to log out');
            }
        })
        .catch(error => {
            console.error('Error logging out:', error);
        });
    };
    

    return (
        <div className="logout-page">
            <h1>Do you want to log out?</h1>
            <button onClick={handleLogout}>Yes</button>
            <button onClick={() => navigate(-1)}>No</button>
        </div>
    );
};

export default LogoutPage;
