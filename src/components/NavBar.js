import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faBookmark, faBars } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';
import { useUser } from './UserContext';
import { debounce } from 'lodash';
import SearchResults from './SearchResult'; // Corrected import path
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import axios from 'axios';


function NavBar() {
    const { user } = useUser();
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState({ movies: [], actors: [] });
    const navigate = useNavigate();
    const { t } = useTranslation();



    // const { t, i18n } = useTranslation();

    useEffect(() => {
        const lang = localStorage.getItem('i18nextLng') || 'en';
        i18n.changeLanguage(lang);
    }, []);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('i18nextLng', lng);
    };


    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const fetchSearchResults = debounce((query) => {
        if (query.length > 0) {
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
        } else {
          setSearchResults({ movies: [], actors: [] });
        }
      }, 300);
      

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (searchResults.movies.length > 0 || searchResults.actors.length > 0) {
                setSearchResults({ movies: [], actors: [] });
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [searchResults]);

    useEffect(() => {
        if (searchQuery.length > 0) {
            fetchSearchResults(searchQuery);
        }
    }, [searchQuery]);

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/search', { state: { query: searchQuery } });
    };
    
    
    const handleNavigateToWatchlist = async () => {
        if (!user) {
            // If the user is not logged in, redirect to the login page or show an alert
            alert(t('pleaseLogin')); // Make sure you have a translation for this message
            navigate('/registerOrLogin');
            return; // Prevent the function from proceeding further
        }
    
        // If the user is logged in, navigate to the Watchlist page
        navigate('/watchlist');
    };
    
    


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="main-con container-fluid justify-content-center">
                <div className="navbar-nav d-flex align-items-center">
                    <Link className="navbar-brand" to="/">
                        <img 
                            src="https://m.media-amazon.com/images/G/01/IMDb/brand/guidelines/imdb/IMDb_Logo_Rectangle_Gold._CB443386186_.png"
                            alt="Logo"
                            className="logo"
                        />
                    </Link>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <FontAwesomeIcon icon={faBars} id='menu-icon' />
                            {t('menu')}
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <Link className="dropdown-item" to="/allMovies">{t('allMovies')}</Link>
                            <Link className="dropdown-item" to="/allCelebs">{t('allCelebs')}</Link>
                        </div>
                    </li>
                    <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <div className="dropdown">
                                <button className="btn btn-outline-light dropdown-toggle" type="button" id="searchDropdownButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {t('all')}
                                </button>
                                <div className="dropdown-menu" aria-labelledby="searchDropdownButton">
                                    <Link className="dropdown-item" to="/under-construction">{t('all')}</Link>
                                    <Link className="dropdown-item" to="/under-construction">{t('titles')}</Link>
                                    <Link className="dropdown-item" to="/under-construction">{t('tvEpisodes')}</Link>
                                    <Link className="dropdown-item" to="/under-construction">{t('celebs')}</Link>
                                    <Link className="dropdown-item" to="/under-construction">{t('companies')}</Link>
                                    <Link className="dropdown-item" to="/under-construction">{t('keywords')}</Link>
                                    <Link className="dropdown-item" to="/under-construction">{t('advancedSearch')}</Link>
                                </div>
                            </div>
                            <input 
                                className="form-control"
                                id="searchbar"
                                type="search"
                                placeholder={t('search')}
                                aria-label="Search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-outline-light" id="search-btn" type="submit">
                                    <FontAwesomeIcon icon={faSearch} />
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className='search-results-dropdown'>
                        <SearchResults results={searchResults} />
                    </div>
                    
                    <button className="btn btn-outline-light ml-2" id="watchlist" type="button" onClick={handleNavigateToWatchlist}>
    <FontAwesomeIcon icon={faBookmark} id="watchlist-icon" /> {t('watchlist')}
</button>

                    <li className="nav-item ml-2">
                        {user ? (
                            <div className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="profileDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <FontAwesomeIcon icon={faUser} /> {user.name}
                                </a>
                                <div className="dropdown-menu" aria-labelledby="profileDropdown">
                                    <Link className="dropdown-item" to="/profile">{t('profile')}</Link>
                                    <Link className="dropdown-item" to="/under-construction">{t('settings')}</Link>
                                    <Link className="dropdown-item" to="/logout">{t('logout')}</Link>
                                </div>
                            </div>
                        ) : (
                            <Link className="nav-link" to="/registerOrLogin">
                                <FontAwesomeIcon icon={faUser} /> {t('signUp')}
                            </Link>
                        )}
                    </li>
                    <li className="nav-item dropdown ml-2">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {i18n.language === 'en' ? 'English' : 'Türkçe'}
                        </a>
                        <div className="dropdown-menu">
                            <button className="dropdown-item" onClick={() => changeLanguage('en')}>English</button>
                            <button className="dropdown-item" onClick={() => changeLanguage('tr')}>Türkçe</button>
                        </div>
                    </li>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
