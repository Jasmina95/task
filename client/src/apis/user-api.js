import axios from 'axios';
import baseUrl from '../config/config';

const create = async user => {
  try {
    const res = await axios.post(`${baseUrl}/api/users`, user);

    return res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      return err.response.data;
    } else {
      return err;
    }
  }
};

export { create };
