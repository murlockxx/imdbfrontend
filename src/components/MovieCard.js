import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPlus, faPlay, faCheck } from '@fortawesome/free-solid-svg-icons';
import './MovieCard.css';
import InteractiveStar from './InteractiveStar';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useUser } from './UserContext';

function MovieCard({ movie }) {
    const { t } = useTranslation();
    const [showTrailer, setShowTrailer] = useState(false);
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const { user } = useUser();

    useEffect(() => {
        const fetchWatchlist = async () => {
            if (user) {
                try {
                    const response = await axios.get('http://localhost:8080/api/v1/watchlist/all', {
                        withCredentials: true // Ensure cookies/session is included with the request
                    });
                    const watchlistIds = response.data;
                    setIsInWatchlist(watchlistIds.includes(movie.id));
                } catch (error) {
                    console.error('Error fetching watchlist:', error);
                }
            }
        };
        fetchWatchlist();
    }, [user, movie.id]);
    

    const handleTrailerClick = () => {
        setShowTrailer(true);
    };

    const handleCloseTrailer = () => {
        setShowTrailer(false);
    };

    const handleAddToWatchlist = async () => {
        if (!user) {
            alert('To add to the watchlist, please login.');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:8080/api/watchlist/add', {
              movieId: movie.id,
              email: user.email  // Assuming `user` contains the logged-in user's information
            }, {
              withCredentials: true
            });
          
            if (response.status === 200) {
              alert('Movie added to watchlist successfully!');
              setIsInWatchlist(true);
            } else {
              alert('Failed to add movie to watchlist.');
            }
          } catch (error) {
            console.error('Error adding movie to watchlist:', error.response ? error.response.data : error.message);
            alert('Failed to add movie to watchlist. ' + (error.response ? error.response.data : error.message));
          }
          
    };
    

    const handleRemoveFromWatchlist = async () => {
        if (!user) {
            alert('To remove from the watchlist, please login.');
            return;
        }
        try {
            const response = await axios.delete(`http://localhost:8080/api/v1/watchlist/removeMovie/${movie.id}`, {
                withCredentials: true
            });
            alert('Movie removed from watchlist successfully!');
            setIsInWatchlist(false);
        } catch (error) {
            console.error('Error removing movie from watchlist:', error.response ? error.response.data : error.message);
            alert('Failed to remove movie from watchlist.');
        }
    };

    const handleWatchlistClick = () => {
        if (isInWatchlist) {
            handleRemoveFromWatchlist();
        } else {
            handleAddToWatchlist();
        }
    };

    return (
        <div className="card movie-card">
            <Link to={`/movie/${encodeURIComponent(movie.movieName.replace(/\s+/g, '-'))}`}>
                <img src={movie.photoUrl} className="card-img-top" alt={movie.movieName} />
            </Link>
            <div className="card-body">
                <div className="card-top">
                    <span className="star"><FontAwesomeIcon icon={faStar} /> {movie.point}</span>
                    <InteractiveStar />
                </div>
                <Link to={`/movie/${encodeURIComponent(movie.movieName.replace(/\s+/g, '-'))}`} className="card-title-link">
                    <h5 className="card-title">{movie.movieName}</h5>
                </Link>
                <div className="button-group">
                    <button className="btn watch-list" onClick={handleAddToWatchlist}>
                        <FontAwesomeIcon icon={isInWatchlist ? faCheck : faPlus} />
                        {t('watchlist')}
                    </button>
                    <button className="btn trailer" onClick={handleTrailerClick}>
                        <FontAwesomeIcon icon={faPlay} />
                        {t('trailer')}
                    </button>
                </div>
            </div>
            {showTrailer && (
                <div className="trailer-modal">
                    <div className="trailer-modal-content">
                        <span className="close" onClick={handleCloseTrailer}>&times;</span>
                        <iframe 
                            width="560" 
                            height="315" 
                            src={movie.trailerLink} 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MovieCard;
