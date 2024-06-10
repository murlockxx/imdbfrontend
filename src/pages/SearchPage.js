import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './SearchPage.css'; // Make sure the styling is correct
import { useTranslation } from 'react-i18next'; 

function SearchPage() {
    const location = useLocation();
    const { query = '' } = location.state || {};
    const [searchResults, setSearchResults] = useState({ movies: [], actors: [] });
    const { t } = useTranslation(); 

    useEffect(() => {
        if (query) {
            fetch(`http://localhost:8080/api/v1/search/searching/${encodeURIComponent(query)}`)
                .then(response => response.json())
                .then(data => {
                    const movies = data.movies.map(movie => ({
                        id: movie.id,
                        image: movie.photoUrl,
                        movieName: movie.movieName,
                        year: movie.year,
                        leadingPlayer: movie.leadingPlayer
                    }));
                    const actors = data.actors.map(actor => ({
                        id: actor.id,
                        photoUrl: actor.photoUrl,
                        name: actor.name,
                        surname: actor.surname,
                        nickName: actor.nickName
                    }));
                    setSearchResults({ movies, actors });
                })
                .catch(error => {
                    console.error('Error fetching search results:', error);
                });
        }
    }, [query]);

    const formatUrl = (name) => {
        if (!name) return '';
        return encodeURIComponent(name.replace(/\s+/g, '-'));
    };

    return (
        <div className="search-page">
            <h1>{t('searchResultsFor')} "{query}"</h1>
            <div className="search-results">
                {searchResults.movies.length > 0 && (
                    <div className="results-section">
                        <h2>{t('movies')}</h2>
                        {searchResults.movies.map((movie, index) => (
                            <Link key={index} to={`/movie/${formatUrl(movie.movieName)}`} className="dropdown-item result-item">
                                <div className="result-image">
                                    <img src={movie.image} alt={movie.movieName || 'Movie Image'} onError={(e) => { e.target.src = 'https://via.placeholder.com/100'; }} />
                                </div>
                                <div className="result-details">
                                    <div className="result-name">{movie.movieName}</div>
                                    <div className="result-info">{movie.year} - {movie.leadingPlayer.join(', ')}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
                {searchResults.actors.length > 0 && (
                    <div className="results-section">
                        <h2>{t('Oyuncular')}</h2>
                        {searchResults.actors.map((actor, index) => (
                            <Link key={index} to={`/actor/${formatUrl(actor.name)}`} className="dropdown-item result-item">
                                <div className="result-image">
                                    <img src={actor.photoUrl || 'https://via.placeholder.com/50'} alt={`${actor.name} ${actor.surname}`} onError={(e) => { e.target.src = 'https://via.placeholder.com/50'; }} />
                                </div>
                                <div className="result-details">
                                    <div className="result-name">{actor.name} {actor.surname}</div>
                                    {actor.nickName && <div className="result-nickname">aka "{actor.nickName}"</div>}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
                {searchResults.movies.length === 0 && searchResults.actors.length === 0 && <p>{t('noResultsFound')}</p>}
            </div>
        </div>
    );
}

export default SearchPage;
