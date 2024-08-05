import axios from 'axios';

const API_URL = 'http://localhost:3000/api/weather';

export const getWeather = async (city) => {
  try {
    const response = await axios.get(API_URL, { params: { city } });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
