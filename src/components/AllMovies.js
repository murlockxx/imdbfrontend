import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import './AllMovies.css'; // Make sure the CSS is imported

const AllMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/movie/getAllMovies', {
            withCredentials: true
        })
        .then(response => {
            setMovies(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError('Error fetching movies');
            setLoading(false);
            console.error(error);
        });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="movie-grid">
            {movies.map(movie => (
                <div key={movie.id} className="movie-item">
                    <MovieCard movie={movie} />
                </div>
            ))}
        </div>
    );
};

export default AllMovies;
