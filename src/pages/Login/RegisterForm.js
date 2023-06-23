import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

const RegisterForm = ({ onClose }) => {
  const [notification, setNotification] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const name = event.target.name.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const address = event.target.address.value;

    const data = {
      username: username,
      password: password,
      name: name,
      email: email,
      phone: phone,
      address: address,
      role: 0,
    };

    try {
      const response = await fetch('https://cookyz.azurewebsites.net/api/Auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        setNotification('Đăng ký thành công'); // Thiết lập thông báo
        // Thực hiện các xử lý khác sau khi đăng ký thành công (chẳng hạn như điều hướng trang)
      } else {
        setNotification('Đăng ký không thành công'); // Thiết lập thông báo
      }
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {/* Hiển thị thông báo nếu có */}
          {notification && <div>{notification}</div>}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, overflow: 'hidden' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField name="username" required fullWidth id="username" label="Username" autoFocus />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField name="name" required fullWidth id="name" label="Name" autoFocus />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Phone Number"
                  type="text"
                  id="phone"
                  autoComplete="tel"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField name="address" required fullWidth id="address" label="Address" autoFocus />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <RouterLink to="#" variant="body2" onClick={onClose}>
                  Already have an account? Sign in
                </RouterLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default RegisterForm;
