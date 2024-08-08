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
  const [loading, setLoading] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);

  const handleFetchWeather = async (city) => {
    setLoading(true);
    setError('');
    try {
      const weatherData = await getWeather(city);
      setWeather(weatherData);
    } catch (err) {
      if (err.response) {
        switch (err.response.status) {
          case 400:
            setError('No matching city found. Please try another city.');
            break;
          case 404:
            setError('No weather data available for the specified city.');
            break;
          case 503:
            setError('Network error. Please try again later.');
            break;
          default:
            setError('Something went wrong. Please try again later.');
        }
      } else {
        setError('Something went wrong. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <>
      <div className={styles.homePage}>
        <div className={styles.Lbox}>
          <img src={Logo} alt="Logo Fintek digital" className={styles.logo} />
          <h3 className={styles.headline}>Use our weather app to see the weather around the world</h3>

          <div>
            <div className={styles.cityBtmRow}>
              <p className={styles.inputCityTitle}>City name</p>
              <button
                onClick={toggleTemperatureUnit}
                className={styles.toggleButton}
                disabled={!weather} 
              >
                {isCelsius ? '°C' : '°F'}
              </button>
            </div>
            <SearchInput onSearch={handleFetchWeather} />
            {loading && <p className={styles.loadingMessage}>Loading...</p>}
            {error && <p className={styles.errorMessage}>{error}</p>}
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
          <WeatherDisplayBox weather={weather} isCelsius={isCelsius} />
        </div>
      </div>
    </>
  );
}
