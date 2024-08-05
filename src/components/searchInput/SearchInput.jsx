import React, { useState } from 'react';
import styles from './SearchInput.module.css';


export default function SearchInput({ onSearch }) {
    const [city, setCity] = useState('');

    const handleSearch = () => {
        onSearch(city);
    };

    return (
        <>
            <div>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                />
                <button onClick={handleSearch}>Get Weather</button>
            </div>
        </>
    )
}
