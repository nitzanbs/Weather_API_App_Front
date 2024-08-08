import React from 'react';
import styles from './WeatherDisplay.module.css';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
};

export default function WeatherDisplayBox({ weather, isCelsius }) {
    console.log('Weather data:', weather);

    if (!weather) {
        return (<div><img className={styles.weatherapiLogo} src="src/img/weather.png" alt="weatherapi logo" /></div>);
    }

    const { location, current, forecast } = weather;

    const cityName = location.name;
    const countryName = location.country;
    const date = formatDate(location.localtime);
    const time = new Date(location.localtime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const temperature = isCelsius ? Math.round(current.temp_c) : Math.round(current.temp_f);
    const weatherDescription = current.condition.text;
    const precipitationMm = Math.round(current.precip_mm);
    const humidityPercentage = current.humidity;
    const windKph = Math.round(current.wind_kph);

    const hourlyTemperatures = forecast?.forecastday?.[0]?.hour
        .filter(hourData => [13, 14, 15, 16, 17].includes(new Date(hourData.time).getHours()))
        .map(hourData => ({
            time: new Date(hourData.time).getHours(),
            temp: isCelsius ? Math.round(hourData.temp_c) : Math.round(hourData.temp_f)
        })) || [];

    return (
        <div className={styles.weatherDisplayFrame}>
            <div className={styles.weatherDisplay}>
                <div>
                    <div>
                        <h2 className={styles.cityName}>{cityName}</h2>
                        <p className={styles.countryName}>{countryName}</p>
                    </div>
                    <p className={styles.dateTime}>{date} at {time}</p>
                    <div className={styles.bigTempBox}>
                        <p className={styles.bigTemp}>{temperature}°</p>
                        <p className={styles.condition}>{weatherDescription}</p>
                    </div>
                </div>

                <div className={styles.categoryRow}>
                    <div>
                        <p className={styles.category}>precipitation</p>
                        <p className={styles.categoryValue}>{precipitationMm} mm</p>
                    </div>
                    <div>
                        <p className={styles.category}>humidity</p>
                        <p className={styles.categoryValue}>{humidityPercentage}%</p>
                    </div>
                    <div>
                        <p className={styles.category}>wind</p>
                        <p className={styles.categoryValue}>{windKph} km/h</p>
                    </div>
                </div>

                {hourlyTemperatures.length > 0 && (
                    <div className={styles.hourRow}>
                        {hourlyTemperatures.map((hour, index) => (
                            <div key={index}>
                                <p className={styles.hour}>{hour.time}:00</p>
                                <p className={styles.hourTemp}>{hour.temp}°</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
