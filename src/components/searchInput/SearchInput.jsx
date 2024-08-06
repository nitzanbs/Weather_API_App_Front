import React, { useState } from 'react';
import styles from './SearchInput.module.css';

export default function SearchInput({ onSearch }) {
    const [city, setCity] = useState('');

    const handleSearch = () => {
        onSearch(city);
    };

    return (
        <div className={styles.searchContainer}>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
                className={styles.searchInput}
            />
            <button onClick={handleSearch} className={styles.searchButton}>Check</button>
        </div>
    );
}
