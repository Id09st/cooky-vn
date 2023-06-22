import { useState } from 'react';
import { Box, Avatar, Typography, TextField, FormControlLabel, Checkbox, Button, Grid } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Notification = ({ message }) => {
  return <div>{message}</div>;
};
const MyForm = () => {
  const [notification, setNotification] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    const data = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch('https://cookyz.azurewebsites.net/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        setNotification('Đăng nhập thành công'); // Thiết lập thông báo
      } else {
        setNotification('Đăng nhập không thành công'); // Thiết lập thông báo
      }
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };

  const handleSignInClick = () => {
    // Xử lý khi nhấp vào "Don't have an account? Sign Up"
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      {/* Hiển thị thông báo nếu có */}
      {notification && <Notification message={notification} />}
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, overflow: 'hidden' }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign In
        </Button>
      </Box>
    </Box>
  );
};

export default MyForm;
