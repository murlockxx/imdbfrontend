import React from 'react';
import Slider from 'react-slick';
import MovieCard from './MovieCard';
import './MovieSlider.css';

const MovieSlider = ({ movies }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    centerMode: false,
    centerPadding: '0',
  };

  // Slice the movies array to only include the first 10 movies
  const displayedMovies = movies.slice(0, 10);

  return (
    <div className="movie-slider">
      <Slider {...settings}>
        {displayedMovies.map((movie, index) => (
          <div key={index} className="slider-item">
            <MovieCard movie={movie} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MovieSlider;
