import React from 'react';
import styles from './LocationDisplay.module.css';

const LocationDisplay = ({ latitude, longitude, dateTime }) => {
    // Format dateTime to DD/MM/YYYY at HH:mm
    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day}/${month}/${year} at ${hours}:${minutes}`;
    };

    return (
        <div className={styles.locationDisplayBox}>
            <div className={styles.row}>
                <p className={styles.dataItem}>Latitude {latitude}</p>
                <p className={styles.dataItem}>Longitude {longitude}</p>
            </div>
            <p className={styles.dataItem}>Accurate to {formatDateTime(dateTime)}</p>
        </div>
    );
};

export default LocationDisplay;
