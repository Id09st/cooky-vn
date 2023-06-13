import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: ''
  });

  const [open, setOpen] = useState(false); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic đăng ký tại đây
    console.log(formData);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false); // Đóng Dialog
  };

  const isPasswordMatch = formData.password === formData.confirmPassword;

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
        Register
      </Typography>

      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        variant="outlined"
        required
      />

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

      <TextField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        variant="outlined"
        required
        error={!isPasswordMatch}
        helperText={!isPasswordMatch && "Passwords do not match"}
      />

      <TextField
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        variant="outlined"
        required
      />

      <TextField
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        variant="outlined"
        required
      />

      <Button variant="contained" type="submit" disabled={!isPasswordMatch}>
        Register
      </Button>

    </Box>
  );
};

export default RegisterForm;
