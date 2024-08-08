import React, { useState } from 'react';
import styles from './SearchInput.module.css';

export default function SearchInput({ onSearch, id }) {
  const [city, setCity] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  const handleSearch = () => {
    onSearch(city);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/[^a-zA-Z\s]/g, '');
    setCity(filteredValue);
  };

  const handleFocus = () => {
    setShowWarning(true);
  };

  const handleBlur = () => {
    setShowWarning(false);
  };

  const handleClear = () => {
    setCity('');
    document.getElementById(id)?.focus(); // Focus back on the input field after clearing
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
        id={id}
      />
      <button
        onClick={handleClear}
        className={styles.clearButton}
        aria-label="Clear input"
        style={{ display: city ? 'block' : 'none' }} // Show button only if there is text
      >
        <span className={styles.clearButtonIcon}>X</span>
      </button>
      <button
        onClick={handleSearch}
        className={styles.searchButton}
        aria-label="Check weather"
        disabled={!city.trim()}
      >
        Check
      </button>
      {showWarning && <p className={styles.warningMessage}>Please enter only English letters.</p>}
    </div>
  );
}
