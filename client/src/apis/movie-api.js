import axios from 'axios';
import baseUrl from '../config/config';

const getTopRatedMovies = async (startIndex, checked) => {
  try {
    const res = await axios.get(`${baseUrl}/api/movies`, {
      params: {
        startIndex: startIndex,
        type: checked ? 'movie' : 'tv show'
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      return err.response.data;
    } else {
      return err;
    }
  }
};

const searchMovies = async (searchString, startIndex) => {
  try {
    const res = await axios.get(`${baseUrl}/api/movies/search`, {
      params: {
        searchString: searchString,
        startIndex: startIndex
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      return err.response.data;
    } else {
      return err;
    }
  }
};

export { getTopRatedMovies, searchMovies };
