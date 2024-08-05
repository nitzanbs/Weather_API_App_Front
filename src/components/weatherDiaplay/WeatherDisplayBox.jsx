import React from 'react'
import styles from './WeatherDisplay.module.css';


export default function WeatherDisplayBox({ weather }) {
    return (
        <>
            <div className={styles.weatherDisplay}>
                {weather ? (
                    <div>
                        <h2>Weather in {weather.location.name}</h2>
                        <p>Temperature: {weather.current.temp_c}°C</p>
                        <p>Condition: {weather.current.condition.text}</p>
                        <img src={weather.current.condition.icon} alt="weather icon" />
                    </div>
                ) : (
                    <p>No weather data available</p>
                )}
            </div>
        </>
    )
}
