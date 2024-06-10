import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetailsPage.css';  // Import the external CSS file
import { useTranslation } from 'react-i18next';

function MovieDetailsPage() {
    const { movieName } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/movie/getDetails/${encodeURIComponent(movieName)}`);
                if (!response.ok) {
                    throw new Error('Movie not found');
                }
                const data = await response.json();
                setMovie(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [movieName]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!movie) return <div>No data found.</div>;

    return (
        <div className="movie-details">
            <div className='movie-details-container'>
                <h1>{movie.movieName}</h1>
                <h3>({movie.year})</h3>
                <div className="details-container">
                    <img src={movie.photoUrl} alt={movie.movieName} />
                    <div className="trailer-link">
                        <iframe 
                            src={movie.trailerUrl}
                            frameborder="0"
                            width="550"
                            height="300"
                            allow="autoplay; encrypted-media"
                            allowfullscreen
                        ></iframe>
                    </div>
                </div>
                <p>{movie.explanation}</p>
                <h3>{t('stars')}</h3>
                <ul className='actors-list'>
                    {movie.leadingPlayer.map((actor, index) => (
                        <li key={index}>{actor}</li>
                    ))}
                </ul>
                <div>
                    <strong>{t('ratings')}:</strong> {movie.point}/10
                </div>

            </div>
            
        </div>
    );
}

export default MovieDetailsPage;
