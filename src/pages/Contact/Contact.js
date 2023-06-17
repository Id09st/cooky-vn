import React, { useEffect } from 'react';
import { AccessTimeOutlined, LocationOnOutlined, MailOutlineOutlined, PhoneAndroid } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Box, Breadcrumbs, Container, Typography, useMediaQuery } from '@mui/material';

export default function Contact() {
  useEffect(() => {
    const setBgImages = () => {
      const elements = document.getElementsByClassName('set-bg');
      Array.from(elements).forEach((element) => {
        const bg = element.dataset.setbg;
        element.style.backgroundImage = `url(${bg})`;
      });
    };
    setBgImages();
  }, []);

  const isMobile = useMediaQuery('(max-width: 601px)');

  return (
    <>
      {isMobile ? (
        <Container maxWidth="lg" style={{ padding: '20px', paddingTop: '55px' }}>
          {/* Bắt đầu breadcrumb Mobile*/}
          <Box
            component="section"
            sx={{
              backgroundImage: 'url(img/breadcrumb.jpg)',
              backgroundSize: 'cover',
              py: 4,
            }}
          >
            <Container maxWidth="lg">
              <Box textAlign="center">
                <Typography variant="h4" style={{ color: 'var(--white-color)' }}>
                  Contact Us
                </Typography>
                <Breadcrumbs
                  aria-label="breadcrumb"
                  separator="›"
                  style={{ color: 'var(--white-color)' }}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Link underline="hover" to="/">
                    <Typography style={{ color: 'var(--white-color)' }}>Home</Typography>
                  </Link>
                  <Typography style={{ color: 'var(--white-color)' }} variant="body1">
                    Contact Us
                  </Typography>
                </Breadcrumbs>
              </Box>
            </Container>
          </Box>
          {/* Kết thúc breadcrumb Mobile*/}

          {/* Contact Section Begin */}
          <section className="contact spad">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                  <div className="contact__widget">
                    <span className="icon_phone">
                      <PhoneAndroid sx={{ fontSize: 40 }} />
                    </span>
                    <h4>Phone</h4>
                    <p>+01-3-8888-6868</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                  <div className="contact__widget">
                    <span className="icon_pin_alt">
                      <LocationOnOutlined sx={{ fontSize: 40 }} />
                    </span>
                    <h4>Address</h4>
                    <p>60-49 Road 11378 New York</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                  <div className="contact__widget">
                    <span className="icon_clock_alt">
                      <AccessTimeOutlined sx={{ fontSize: 40 }} />
                    </span>
                    <h4>Open time</h4>
                    <p>10:00 am to 23:00 pm</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                  <div className="contact__widget">
                    <span className="icon_mail_alt">
                      <MailOutlineOutlined sx={{ fontSize: 40 }} />
                    </span>
                    <h4>Email</h4>
                    <p>hello@colorlib.com</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Contact Section End */}
        </Container>
      ) : (
        <Container maxWidth="lg" style={{ padding: '20px', paddingTop: '70px' }}>
          {/* Bắt đầu breadcrumb Tablet pc*/}
          <Box
            component="section"
            sx={{
              backgroundImage: 'url(img/breadcrumb.jpg)',
              backgroundSize: 'cover',
              py: 4,
            }}
          >
            <Container maxWidth="lg">
              <Box textAlign="center">
                <Typography variant="h2" style={{ color: 'var(--white-color)' }}>
                  Contact Us
                </Typography>
                <Breadcrumbs
                  aria-label="breadcrumb"
                  separator="›"
                  style={{ color: 'var(--white-color)' }}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Link underline="hover" to="/">
                    <Typography style={{ color: 'var(--white-color)' }}>Home</Typography>
                  </Link>
                  <Typography style={{ color: 'var(--white-color)' }} variant="body1">
                    Contact Us
                  </Typography>
                </Breadcrumbs>
              </Box>
            </Container>
          </Box>
          {/* Kết thúc breadcrumb Tablet pc*/}

          {/* Contact Section Begin */}
          <section className="contact spad">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                  <div className="contact__widget">
                    <span className="icon_phone">
                      <PhoneAndroid sx={{ fontSize: 40 }} />
                    </span>
                    <h4>Phone</h4>
                    <p>+01-3-8888-6868</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                  <div className="contact__widget">
                    <span className="icon_pin_alt">
                      <LocationOnOutlined sx={{ fontSize: 40 }} />
                    </span>
                    <h4>Address</h4>
                    <p>60-49 Road 11378 New York</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                  <div className="contact__widget">
                    <span className="icon_clock_alt">
                      <AccessTimeOutlined sx={{ fontSize: 40 }} />
                    </span>
                    <h4>Open time</h4>
                    <p>10:00 am to 23:00 pm</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                  <div className="contact__widget">
                    <span className="icon_mail_alt">
                      <MailOutlineOutlined sx={{ fontSize: 40 }} />
                    </span>
                    <h4>Email</h4>
                    <p>hello@colorlib.com</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Contact Section End */}
        </Container>
      )}
    </>
  );
}
