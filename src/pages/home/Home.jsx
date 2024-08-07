import React, { useState } from 'react';
import { getWeather } from '../../weatherService';
import WeatherDisplayBox from '../../components/weatherDiaplay/WeatherDisplayBox';
import SearchInput from '../../components/searchInput/SearchInput';
import styles from './Home.module.css';
import Logo from '../../img/logo.svg'; 
import LocationDisplay from '../../components/locationDisplay/LocationDisplay';

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const handleFetchWeather = async (city) => {
    try {
      const weatherData = await getWeather(city);
      setWeather(weatherData);
      setError('');
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    }
  };

  return (
    <>
      <div className={styles.homePage}>
        <div className={styles.Lbox}>
          <img src={Logo} alt="Logo" className={styles.logo} /> 
          <h3 className={styles.headline}>Use our weather app to see the weather around the world</h3>
          <div>
            <p className={styles.inputCityTitle}>City name</p>
            <SearchInput onSearch={handleFetchWeather} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
          <div className={styles.LocationDisplayDiv}>
            {weather && (
              <LocationDisplay
                latitude={weather.location.lat}
                longitude={weather.location.lon}
                dateTime={weather.location.localtime}
              />
            )}
          </div>
        </div>
        <div className={styles.Rbox}>
          <WeatherDisplayBox weather={weather} />
        </div>
      </div>
    </>
  );
}
