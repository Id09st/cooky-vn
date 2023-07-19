import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Avatar, Typography, TextField, Button, Grid, IconButton } from '@mui/material';
import RegisterForm from './RegisterForm';
import { Close, RamenDining } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Notification = ({ message }) => {
  return <div>{message}</div>;
};
const LoginForm = ({ onClose, onLoginSuccess }) => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [notification, setNotification] = useState(null);
  const [open, setOpen] = useState(false);
  let name, role;

  const decodeAndStoreToken = (token) => {
    const parts = token.split('.');
    if (parts.length === 3) {
      const base64Url = parts[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      const payload = JSON.parse(window.atob(base64));

      // Lấy role và name
      name = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
      role = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

      localStorage.setItem('role', role);
      localStorage.setItem('name', name);

      if (role === 'User') {
        navigate('/shoping-cart');
        localStorage.setItem('isLoggedIn', 'true');
        if (onClose) {
          onClose();
        }
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      }
    } else {
      console.log('Token không hợp lệ');
    }
  };

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    const data = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch('https://cookyzz.azurewebsites.net/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authentication: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.token) {
          decodeAndStoreToken(responseData.token);
        } else {
          console.log('Token không tồn tại');
        }

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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '80px 30px 40px 30px',
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
        <IconButton style={{ position: 'absolute', right: 1, top: 1 }} onClick={onClose}>
          <Close />
        </IconButton>
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
