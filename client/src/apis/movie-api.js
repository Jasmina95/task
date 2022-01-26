import axios from 'axios';
import baseUrl from '../config/config';

const listAllMovies = async () => {
  try {
    const res = await axios.get(`${baseUrl}/api/movies/all`, {
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

const rateMovie = async (movieId, ratingValue, token) => {
  try {
    const res = await axios.put(
      `${baseUrl}/api/movies/rate/${movieId}`,
      { ratingValue: ratingValue },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      }
    );
    return res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      return err.response.data;
    } else {
      return err;
    }
  }
};

export { listAllMovies, getTopRatedMovies, searchMovies, rateMovie };
