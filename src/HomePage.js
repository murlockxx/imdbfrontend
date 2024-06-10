import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieSlider from './components/MovieSlider'; // Import the MovieSlider component
import './HomePage.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/movie/getAllMovies', {
      withCredentials: true // Ensure credentials are included if needed
    })
      .then(response => {
        setMovies(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch(error => {
        setError('Error fetching movies');
        setLoading(false);
        console.error(error);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="home-page">
      <div className="movie-part">
        <MovieSlider movies={movies} />
      </div>
    </div>
  );
};

export default HomePage;
