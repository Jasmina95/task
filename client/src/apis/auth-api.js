import axios from 'axios';
import baseUrl from '../config/config';

const signin = async user => {
  try {
    const res = await axios.post(`${baseUrl}/auth/signin`, user);

    sessionStorage.setItem('jwtToken', res.data);
  } catch (err) {
    if (err.response && err.response.data) {
      return err.response.data;
    } else {
      return err;
    }
  }
};

const signout = async () => {
  await axios.get(`${baseUrl}/auth/signout`);
  sessionStorage.removeItem('jwtToken');
};

export { signin, signout };
