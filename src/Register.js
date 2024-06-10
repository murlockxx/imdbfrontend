import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RegisterPage.css'; // Import CSS file for styling

const RegisterPage = () => {
  // State variables to store form data
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  // Fetch countries data from API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://countriesnow.space/api/v0.1/countries');
        setCountries(response.data.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  // Function to handle form submission
  // Function to handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  // Validate form fields
  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }
  // Send form data to backend
  try {
    const response = await axios.post('api/v1/user/register', {
      name,
      surname,
      email,
      password,
      country,
      city
    });
    console.log('Registration response:', response.data);

    // Handle the response here
    if (typeof response.data === 'string') {
      // If the response is a string, you can display it to the user
      alert(response.data);
    } else {
      // Handle other types of responses (e.g., JSON objects)
      console.log('Unexpected response format:', response.data);
    }

    // Optionally, you can redirect the user to a different page upon successful registration
  } catch (error) {
    console.error('Error registering user:', error);
    // Handle registration error (e.g., display error message to the user)
  }
};


  // Function to handle country selection
  const handleCountryChange = (country) => {
    const selectedCountryObj = countries.find((c) => c.country === country);
    setCountry(selectedCountryObj?.country || '');
    if (selectedCountryObj) {
      setCities(selectedCountryObj.cities);
      setCity('');
    } else {
      setCities([]);
      setCity('');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Surname:</label>
          <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password Again:</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <div className="form-group geo">
          <label>Country:</label>
          <select value={country} onChange={(e) => handleCountryChange(e.target.value)} required>
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.country} value={country.country}>
                {country.country}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group geo">
          <label>City:</label>
          <select value={city} onChange={(e) => setCity(e.target.value)} required>
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
