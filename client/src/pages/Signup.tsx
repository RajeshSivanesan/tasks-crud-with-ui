import React, { useState } from 'react';
import { TextField, Button, Container, Stack } from '@mui/material';
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
    } catch(ex) {
      console.log(ex);
    }
  }

  return (
    <React.Fragment>
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
      <small>Already have an account? <Link to="/login">Login Here</Link></small>

    </React.Fragment>
  )
}

export default RegisterForm;