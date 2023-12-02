import React, { useState } from 'react';
import { TextField, Button, Stack, Grid, CssBaseline, Paper, Box } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { postSignup } from '../api';
import { useAuth } from '../hooks/useAuth';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setAuth } = useAuth() as any;

  async function handleSubmit(event: any) {
    event.preventDefault();
    try {
      const response = await postSignup({
        name,
        email,
        password,
        age
      });
      if (response?.errors) {
        setError(response?.message);
      } else {
        setAuth(response);
        navigate('/tasks');
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <React.Fragment>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h2>Register Form</h2>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                <TextField
                  type="text"
                  variant='outlined'
                  color='secondary'
                  label="Name"
                  onChange={e => setName(e.target.value)}
                  value={name}
                  fullWidth
                  required
                />
              </Stack>
              <TextField
                type="email"
                variant='outlined'
                color='secondary'
                label="Email"
                onChange={e => setEmail(e.target.value)}
                value={email}
                fullWidth
                required
                sx={{ mb: 4 }}
              />
              <TextField
                type="password"
                variant='outlined'
                color='secondary'
                label="Password"
                onChange={e => setPassword(e.target.value)}
                value={password}
                required
                fullWidth
                sx={{ mb: 4 }}
              />
              <TextField
                type="password"
                variant='outlined'
                color='secondary'
                label="Confirm Password"
                onChange={e => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
                fullWidth
                sx={{ mb: 4 }}
              />
              <TextField
                type="number"
                variant='outlined'
                color='secondary'
                label="Age"
                onChange={e => setAge(e.target.value)}
                value={age}
                fullWidth
                required
                sx={{ mb: 4 }}
              />
              <Button variant="outlined" color="secondary" type="submit">Register</Button>
            </form>
            <small>Already have an account? <Link to="/">Login Here</Link></small>
          </Box>
        </Grid>
      </Grid>

    </React.Fragment>
  )
}

export default RegisterForm;