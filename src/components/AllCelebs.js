import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CelebCard from './CelebCard';
import './AllCelebs.css'; // Ensure you have this CSS file

const AllCelebs = () => {
    const [celebs, setCelebs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/actor/getAll', {
            withCredentials: true // Ensure credentials are included if needed
        })
        .then(response => {
            setCelebs(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Failed to fetch celebrities:', error);
            setError('Error fetching celebrities');
            setLoading(false);
        });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="celeb-grid">
            {celebs.map((actor, index) => (
                <CelebCard key={index} actor={actor} />
            ))}
        </div>
    );
};

export default AllCelebs;
