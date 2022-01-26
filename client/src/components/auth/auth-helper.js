import jwtDecode from 'jwt-decode';

const isAuthenticated = () => {
  if (sessionStorage.getItem('jwtToken')) {
    return sessionStorage.getItem('jwtToken');
  } else {
    return false;
  }
};

const getUser = () => {
  if (sessionStorage.getItem('jwtToken')) {
    return jwtDecode(sessionStorage.getItem('jwtToken'))._id;
  } else {
    return false;
  }
};

export { isAuthenticated, getUser };
