import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Avatar, Typography, TextField, Button, Grid } from '@mui/material';
import RegisterForm from './RegisterForm';
import { RamenDining } from '@mui/icons-material';

const Notification = ({ message }) => {
  return <div>{message}</div>;
};
const LoginForm = () => {
  const [showSignIn, setShowSignIn] = useState(false);
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
      const response = await fetch('https://cookyz.somee.com/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // "Authentication": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        // localStorage.setItem('token', response.data.token);
        setNotification('Đăng nhập thành công'); // Thiết lập thông báo
      } else {
        setNotification('Đăng nhập không thành công'); // Thiết lập thông báo
      }
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };

  const handleSignInClick = () => {
    setShowSignIn(true);
  };

  if (showSignIn) {
    return <RegisterForm onClose={() => setShowSignIn(false)} />;
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'var(--primary-color)' }}>
        <RamenDining />
      </Avatar>
      <Typography component="h1" variant="h5">
        Đăng nhập
      </Typography>
      {/* Hiển thị thông báo nếu có */}
      {notification && <Notification message={notification} />}
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, overflow: 'hidden' }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Tài khoản đăng nhập"
          name="username"
          autoComplete="username"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Mật khẩu"
          type="password"
          id="password"
          autoComplete="current-password"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          style={{ backgroundColor: 'var(--primary-color)', color: 'var(--white-color)' }}
        >
          Đăng nhập
        </Button>
        <Grid container>
          <Grid item>
            <RouterLink to="#" variant="body2" style={{ color: 'var(--primary-color)' }} onClick={handleSignInClick}>
              {'Bạn chưa có tài khoản? Đăng ký'}
            </RouterLink>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LoginForm;
