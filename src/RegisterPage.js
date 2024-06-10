import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom'; // Make sure to import only Navigate
import './RegisterPage.css';
import { useTranslation } from 'react-i18next';

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
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { t } = useTranslation();

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Check if password meets complexity requirements
    const passwordRegex = /^(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert('Password must be at least 8 characters long, contain at least 1 number, and at least 1 non-alphanumeric character');
      return;
    }

    // Send form data to backend
    try {
      const response = await axios.post('http://localhost:8080/api/v1/user/register', {
        name,
        surname,
        email,
        password,
        country,
        city
      });

      console.log('Registration response:', response.data);
      if (response.status === 200 || response.status === 201) {  // Assuming 200 OK or 201 Created are successful responses
        setRegistrationSuccess(true);
      } else {
        console.error('Registration unsuccessful:', response.data);
        alert('Registration unsuccessful: ' + response.data);
      }
    } catch (error) {
      console.error('Error registering user:', error.response ? error.response.data : error.message);
      alert('Registration failed: ' + (error.response ? error.response.data : error.message));
    }
  }

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

  if (registrationSuccess) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        {[
          { label: t('name'), type: "text", value: name, onChange: (e) => setName(e.target.value) },
          { label: t('surname'), type: "text", value: surname, onChange: (e) => setSurname(e.target.value) },
          { label: "Email", type: "email", value: email, onChange: (e) => setEmail(e.target.value) },
          { label: t('password'), type: "password", value: password, onChange: (e) => setPassword(e.target.value) },
          { label: t('passwordAgain'), type: "password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value) },
        ].map((input, index) => (
          <div className="form-group" key={index}>
            <label>{input.label}:</label>
            <input type={input.type} value={input.value} onChange={input.onChange} required placeholder={input.label} />
          </div>
        ))}
        <div className="form-group">
          <label>{t('country')}</label>
          <select value={country} onChange={(e) => handleCountryChange(e.target.value)} required>
            <option value="">{t('selectCountry')}</option>
            {countries.map((country) => (
              <option key={country.country} value={country.country}>
                {country.country}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>{t('city')}</label>
          <select value={city} onChange={(e) => setCity(e.target.value)} required>
            <option value="">{t('selectCity')}</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="register-btn">{t('register')}</button>
      </form>
    </div>
  );
};

export default RegisterPage;
