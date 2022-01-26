import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from 'react-router-dom';
import { isAuthenticated } from './auth/auth-helper';
import { signout } from '../apis/auth-api';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';

const Header = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const navigate = useNavigate();

  const logout = () => {
    signout().then(data => {
      navigate('/');
    });
  };

  return (
    <AppBar position='static'>
      <Toolbar sx={{ flexGrow: 1, alignItems: 'center' }}>
        <Typography
          variant={matches ? 'subtitle1' : 'h6'}
          color='inherit'
          sx={{ flexGrow: 1 }}
        >
          Movie Search App
        </Typography>
        <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}>
          <HomeIcon />
        </Link>
        &nbsp;&nbsp;
        {!isAuthenticated() && (
          <span>
            <Link
              to='/signup'
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              Sign up
            </Link>
            &nbsp;&nbsp;
            <Link
              to='/login'
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              Log in
            </Link>
          </span>
        )}
        {isAuthenticated() && (
          <Link
            to='/movies/rate'
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            Rate Movies
          </Link>
        )}
        {isAuthenticated() && matches ? (
          <IconButton
            onClick={logout}
            sx={{ color: 'inherit', padding: 0, paddingLeft: '5px' }}
          >
            <LogoutIcon />
          </IconButton>
        ) : (
          <Button color='inherit' onClick={logout}>
            Log Out
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
