import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import NavBar from './components/NavBar'; // Make sure this import path is correct
import { UserProvider } from './components/UserContext'; // Import the context provider
import ProfilePage from './pages/ProfilePage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import ActorDetailsPage from './pages/ActorDetailsPage';
import SearchPage from './pages/SearchPage';
import LogoutPage from './pages/LogoutPage';
import AuthOptions from './pages/AuthOptions';
import WatchlistPage from './pages/WatchlistPage';
import AllCelebs from './components/AllCelebs';
import AllMovies from './components/AllMovies';
import UnderConstruction from './pages/UnderConstruction';

function App() {
  return (
    <div className="App">
      <UserProvider>  {/* Wrap the entire application with UserProvider */}
        <Router>
          <NavBar />  {/* This places the NavBar at the top of all pages */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/movie/:movieName" element={<MovieDetailsPage/>}/>
            <Route path="/actor/:actorName" element={<ActorDetailsPage/>} />
            <Route path="/search" element={<SearchPage/>} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/registerOrLogin" element={<AuthOptions/>} />
            <Route path="/watchlist" element={<WatchlistPage/>}/>
            <Route path="/allMovies" element={<AllMovies />} />
            <Route path="/allCelebs" element={<AllCelebs />} />
            <Route path="/under-construction" element={<UnderConstruction />} />
           

            

          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;