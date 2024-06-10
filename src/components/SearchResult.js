import React from 'react';
import { Link } from 'react-router-dom';
import './SearchResults.css'; // Ensure this is correctly imported

function SearchResults({ results }) {
    if (!results || (results.movies.length === 0 && results.actors.length === 0)) {
        return null; // Don't render anything if there are no results
    }

    const formatUrl = (name) => {
        if (!name) return '';
        // Replace spaces with hyphens and encode URI components to ensure URL is safe
        return encodeURIComponent(name.replace(/\s+/g, '-'));
    };

    console.log('Results:', results); // Debugging line

    return (
        <div className="search-results-dropdown">
            {results.movies && results.movies.length > 0 && (
                <div className="results-section">
                    <h4 className='categoryName'>Movies</h4>
                    {results.movies.slice(0, 3).map((movie, index) => (
                        <Link key={index} to={`/movie/${formatUrl(movie.movieName)}`} className="dropdown-item result-item">
                            <div className="result-image">
                                <img src={movie.image} alt={movie.movieName || 'Movie Image'} onError={(e) => {e.target.src = 'https://via.placeholder.com/100'}} />
                            </div>
                            <div className="result-details">
                                <div className="result-name">{movie.movieName}</div>
                                <div className="result-info">{movie.year} - {movie.leadingPlayer.join(', ')}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            {results.actors && results.actors.length > 0 && (
            <div className="results-section">
                {/* Uncomment below line to show the section title if needed */}
                <h4 className='categoryName'>Actors</h4>
                {results.actors.slice(0, 3).map((actor, index) => (
                    <Link key={index} to={`/actor/${formatUrl(actor.name)}`} className="dropdown-item result-item">
                        <div className="result-image">
                            <img src={actor.photoUrl || 'https://via.placeholder.com/50'} alt={`${actor.name || 'Unknown'} ${actor.surname || ''}`} />
                        </div>
                        <div className="result-details">
                            <div className="result-name">{actor.name || 'Unknown'} {actor.surname || ''}</div>
                            {actor.nickName && <div className="result-nickname">aka  "{actor.nickName}"</div>}
                        </div>
                    </Link>
                ))}
            </div>
        )}

        </div>
    );
}

export default SearchResults;
