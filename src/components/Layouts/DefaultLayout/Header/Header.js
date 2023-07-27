import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import logo from '~/assets/images/logo.png';
import {
  Alert,
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Dialog,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Snackbar,
  Toolbar,
  Typography,
} from '@mui/material';
import LoginForm from '~/pages/Login/LoginForm';
import {
  AccountCircle,
  Call,
  CallOutlined,
  HomeOutlined,
  Login,
  Logout,
  MoreHorizOutlined,
  Person,
  SearchOutlined,
  ShoppingBag,
  ShoppingCartOutlined,
} from '@mui/icons-material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: 0,
  marginLeft: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  right: '0',
  zIndex: 1,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `15px`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '80ch',
    },
  },
}));

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setOpenSnackbar(true);
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedIn === 'true');
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const nameFromStorage = localStorage.getItem('name');
        const response = await fetch('https://cookyzz.azurewebsites.net/api/Users/');
        const users = await response.json();
        const user = users.find((user) => user.username === nameFromStorage);
        const userResponse = await fetch(`https://cookyzz.azurewebsites.net/api/Users/${user.id}`);
        const data = await userResponse.json();
        const orderResponse = await fetch(`https://cookyzz.azurewebsites.net/api/Orders/${data.orders[0].id}`);
        const dataOrder = await orderResponse.json();
        setCartItems(dataOrder.items);
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  useLayoutEffect(() => {
    function updateIsMobile() {
      setIsMobile(window.innerWidth < 600);
    }

    window.addEventListener('resize', updateIsMobile);
    updateIsMobile();

    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleOpen = () => {
    setOpenLoginDialog(true);
  };

  const handleSearchIconClick = () => {
    if (searchTerm.trim() !== '') {
      navigate(`/results/${searchTerm}`);
      setSearchTerm('');
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && searchTerm.trim() !== '') {
      navigate(`/results/${searchTerm}`);
      setSearchTerm('');
    }
  };

  const handleRegisterClick = () => {
    setOpenLoginDialog(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setOpenSnackbar(true);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isLoggedIn ? (
        <>
          <MenuItem onClick={handleMenuClose}>
            <Button style={{ color: 'black' }} component={Link} to="/user" startIcon={<Person />}>
              Tài Khoản
            </Button>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Button style={{ color: 'black' }} component={Link} to="/order" startIcon={<ShoppingBag />}>
              Đơn Mua
            </Button>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Button onClick={handleLogout} sx={{ color: 'black' }} startIcon={<Logout />}>
              Đăng Xuất
            </Button>
          </MenuItem>
        </>
      ) : (
        <MenuItem onClick={handleMenuClose}>
          <Button onClick={handleOpen} sx={{ color: 'black' }} startIcon={<Login />}>
            Đăng Nhập
          </Button>
        </MenuItem>
      )}
      <Dialog open={openLoginDialog} onClose={handleRegisterClick}>
        <LoginForm onClose={handleRegisterClick} onLoginSuccess={handleLoginSuccess} />
      </Dialog>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {role === 'User' || role === 'Admin' ? (
        <MenuItem onClick={handleMobileMenuClose}>
          <IconButton size="large" color="inherit">
            <Link to="/shoping-cart" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ShoppingCartOutlined style={{ borderRadius: '50%', color: 'black' }} />
            </Link>
          </IconButton>
        </MenuItem>
      ) : (
        <></>
      )}
      <MenuItem onClick={handleMobileMenuClose}>
        <IconButton size="large" color="inherit">
          <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>
            <CallOutlined style={{ borderRadius: '50%', color: 'black' }} />
          </Link>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton size="large" aria-haspopup="true" color="inherit">
          <AccountCircle style={{ borderRadius: '50%' }} />
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {isLoggedIn ? 'Đăng nhập thành công!' : 'Đăng xuất thành công!'}
        </Alert>
      </Snackbar>
      {isMobile ? ( // Kiểm tra nếu là điện thoại di động
        <>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ bgcolor: 'var(--primary-color)' }}>
              <Container>
                <Toolbar>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexGrow: 1,
                    }}
                  >
                    <Link to="/">
                      <IconButton edge="start" color="inherit" aria-label="home">
                        <HomeOutlined sx={{ color: 'white' }} />
                      </IconButton>
                    </Link>
                  </Box>
                  <Search style={{ color: 'var(--para-color)', backgroundColor: 'var(--background-2)' }}>
                    <SearchIconWrapper onClick={handleSearchIconClick}>
                      <SearchOutlined />
                    </SearchIconWrapper>
                    <StyledInputBase
                      value={searchTerm}
                      onChange={handleInputChange}
                      placeholder="Tìm kiếm công thức hoặc sản phẩm ..."
                      inputProps={{ 'aria-label': 'search' }}
                      style={{
                        borderRadius: '5px',
                        width: 'auto',
                        height: '30px',
                      }}
                    />
                  </Search>
                  <Box sx={{ flexGrow: 1 }} />
                  <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    {role === 'User' || role === 'Admin' ? (
                      <>
                        <IconButton size="large">
                          <Link to="/shoping-cart">
                            <ShoppingCartOutlined sx={{ color: 'var(--white-color)' }} />
                          </Link>
                        </IconButton>
                      </>
                    ) : (
                      <></>
                    )}
                    <IconButton size="large">
                      <Link to="/contact">
                        <Call sx={{ color: 'var(--white-color)' }} />
                      </Link>
                    </IconButton>
                    <IconButton
                      size="large"
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={handleProfileMenuOpen}
                    >
                      <AccountCircle sx={{ color: 'var(--white-color)' }} />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                      size="large"
                      aria-label="show more"
                      aria-controls={mobileMenuId}
                      aria-haspopup="true"
                      onClick={handleMobileMenuOpen}
                      color="inherit"
                    >
                      <MoreHorizOutlined />
                    </IconButton>
                  </Box>
                </Toolbar>
              </Container>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ bgcolor: 'var(--primary-color)' }}>
              <Container>
                <Toolbar>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexGrow: 1,
                    }}
                  >
                    <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                      <Link to="/">
                        <img src={logo} alt="/" />
                      </Link>
                    </Typography>
                  </Box>
                  <Search>
                    <SearchIconWrapper onClick={handleSearchIconClick}>
                      <SearchOutlined style={{ color: 'var(--para-color)', backgroundColor: 'var(--background-2)' }} />
                    </SearchIconWrapper>
                    <StyledInputBase
                      value={searchTerm}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      placeholder="Tìm kiếm công thức hoặc sản phẩm ..."
                      inputProps={{ 'aria-label': 'search' }}
                      style={{
                        color: 'var(--para-color)',
                        backgroundColor: 'var(--background-2)',
                        borderRadius: '5px',
                        width: '500px',
                        height: '35px',
                      }}
                    />
                  </Search>
                  <Box sx={{ flexGrow: 1 }} />
                  <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    {role === 'User' || role === 'Admin' ? (
                      <IconButton size="large">
                        <Link to="/shoping-cart">
                          <ShoppingCartOutlined sx={{ color: 'var(--white-color)' }} />
                        </Link>
                      </IconButton>
                    ) : (
                      <></>
                    )}
                    <IconButton size="large">
                      <Link to="/contact">
                        <Call sx={{ color: 'var(--white-color)' }} />
                      </Link>
                    </IconButton>
                    <IconButton size="large" edge="end" aria-haspopup="true" onClick={handleProfileMenuOpen}>
                      <AccountCircle sx={{ color: 'var(--white-color)' }} />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                      size="large"
                      aria-label="show more"
                      aria-controls={mobileMenuId}
                      aria-haspopup="true"
                      onClick={handleMobileMenuOpen}
                      color="inherit"
                    >
                      <MoreHorizOutlined />
                    </IconButton>
                  </Box>
                </Toolbar>
              </Container>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
          </Box>
        </>
      )}
    </>
  );
}
