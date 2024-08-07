import React, { useState } from 'react';
import styles from './SearchInput.module.css';

export default function SearchInput({ onSearch }) {
    const [city, setCity] = useState('');
    const [showWarning, setShowWarning] = useState(false);

    const handleSearch = () => {
        onSearch(city);
    };

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        // סינון תווים לא רצויים (לא אותיות באנגלית)
        const filteredValue = inputValue.replace(/[^a-zA-Z\s]/g, '');
        setCity(filteredValue);
    };

    const handleFocus = () => {
        setShowWarning(true);
    };

    const handleBlur = () => {
        setShowWarning(false);
    };

    return (
        <div className={styles.searchContainer}>
            <input
                type="text"
                value={city}
                onChange={handleInputChange}
                placeholder="Enter city"
                aria-label="Enter city name"
                className={styles.searchInput}
                pattern="[a-zA-Z\s]*"  
                title="Please enter only English letters" 
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <button onClick={handleSearch} className={styles.searchButton} aria-label="Check weather">Check</button>
            {showWarning && <p className={styles.warningMessage}>Please enter only English letters.</p>}
        </div>
    );
}
