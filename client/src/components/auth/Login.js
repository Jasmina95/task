import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { signin } from '../../apis/auth-api';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    redirectToHome: false
  });

  const handleChange = field => e => {
    setValues({ ...values, [field]: e.target.value });
  };

  const onClickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined
    };

    signin(user).then(data => {
      if (data && data.error) {
        setValues({ ...values, error: data.error, password: '', email: '' });
      } else {
        setValues({ ...values, error: '', redirectToHome: true });
      }
    });
  };

  if (values.redirectToHome) return <Navigate to='/' />;

  return (
    <Card
      sx={{ maxWidth: 600, margin: 'auto', textAlign: 'center', mt: '20px' }}
    >
      <CardContent>
        <Typography variant='h6'>Log In</Typography>
        <TextField
          label='Email'
          value={values.email}
          onChange={handleChange('email')}
          margin='normal'
          sx={{ width: 300 }}
        />
        <TextField
          label='Password'
          type='password'
          value={values.password}
          onChange={handleChange('password')}
          margin='normal'
          sx={{ width: 300 }}
        />
        {values.error && (
          <Typography component='p' color='error'>
            {values.error}
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'center', mb: '20px' }}>
        <Button variant='contained' onClick={onClickSubmit}>
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};

export default Login;
