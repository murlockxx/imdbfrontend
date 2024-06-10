import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';  // Assuming you have a MovieCard component for displaying individual movies
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

function WatchlistPage() {
    const [watchlistMovies, setWatchlistMovies] = useState([]);

    const { t } = useTranslation();
    useEffect(() => {
        const lang = localStorage.getItem('i18nextLng') || 'en';
        i18n.changeLanguage(lang);
    }, []);


    useEffect(() => {
        const fetchWatchlist = async () => {
            const url = 'http://localhost:8080/api/v1/watchlist/getUserWatchlist';
            try {
                const response = await axios.get(url, {
                    withCredentials: true  // Ensure cookies are sent with the request
                });
                setWatchlistMovies(response.data);
                console.log('Watchlist fetched successfully:', response.data);
            } catch (error) {
                console.error('Error fetching watchlist:', error.response ? error.response.data : error.message);
                alert('Failed to fetch watchlist.');
            }
        };
    
        fetchWatchlist();
    }, []);
    

    return (
        <div>
            <h1>{t('yourWatchlist')}</h1>
            <div className="watchlist-container">
                {watchlistMovies.length > 0 ? (
                    watchlistMovies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                ) : (
                    <p>{t('noMoviesInYourWatchlist')}</p>
                )}
            </div>
        </div>
    );
}

export default WatchlistPage;
