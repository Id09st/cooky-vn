import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic đăng nhập tại đây
    console.log(formData);
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Login
      </Typography>

      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        variant="outlined"
        required
      />

      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        variant="outlined"
        required
      />

      <Button variant="contained" type="submit">
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;