import React, { useState } from 'react';
import { getWeather } from '../weatherService';
import WeatherDisplayBox from '../components/weatherDiaplay/WeatherDisplayBox';
import SearchInput from '../components/searchInput/SearchInput';

export default function Home() {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

  const handleFetchWeather = async () => {
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
     <div>
      <h1>Weather App</h1>
      <SearchInput onSearch={handleFetchWeather} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <WeatherDisplayBox weather={weather} />
    </div>
    
    </>
  )
}
