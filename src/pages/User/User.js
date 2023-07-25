import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Avatar, Container, Tab, Tabs, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { AccountBalanceOutlined, CommentBankOutlined, Person, ShoppingBag } from '@mui/icons-material';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function User() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container style={{ marginTop: '110px', marginBottom: '30px' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} columns={16}>
          <Grid item xs={5}>
            <Item>
              <Box display="flex" justifyContent="center">
                <Avatar sx={{ width: '180px', height: '180px' }}>H</Avatar>
              </Box>
              <Typography style={{ marginTop: '20px' }} variant="h4">
                Trần Minh Thiện
              </Typography>

              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                orientation="vertical"
                style={{ marginTop: '10px' }}
              >
                <Tab
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Person style={{ marginRight: '10px' }} />
                      Tài khoản của tôi
                    </Box>
                  }
                  {...a11yProps(0)}
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    borderBottom: '1px solid var(--para-color)',
                  }}
                />

                <Tab
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ShoppingBag style={{ marginRight: '10px' }} />
                      Thông tin đơn hàng
                    </Box>
                  }
                  {...a11yProps(1)}
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    borderBottom: '1px solid var(--para-color)',
                  }}
                />

                <Tab
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CommentBankOutlined style={{ marginRight: '10px' }} />
                      Đánh giá đơn hàng
                    </Box>
                  }
                  {...a11yProps(2)}
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'flex-start',
                  }}
                />
              </Tabs>
            </Item>
          </Grid>
          <Grid item xs={11}>
            <Item>
              <Typography variant="h4">Profile Page Của Tôi</Typography>
              <CustomTabPanel value={value} index={0}>
                Tài khoản của tôi
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                Thông tin đơn hàng
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                Đánh giá đơn hàng
              </CustomTabPanel>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
