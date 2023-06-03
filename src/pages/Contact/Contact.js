import React, { useEffect } from 'react';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { PhoneAndroid } from '@mui/icons-material';

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
  return (
    <>
      {/* Breadcrumb Section Begin */}
      <section className="breadcrumb-section set-bg" data-setbg="img/breadcrumb.jpg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb__text">
                <h2>Contact Us</h2>
                <div className="breadcrumb__option">
                  <a href="./index.html">Home</a>
                  <span>Contact Us</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb Section End */}
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
                  <LocationOnIcon sx={{ fontSize: 40 }} />
                </span>
                <h4>Address</h4>
                <p>60-49 Road 11378 New York</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 text-center">
              <div className="contact__widget">
                <span className="icon_clock_alt">
                  <AccessTimeIcon sx={{ fontSize: 40 }} />
                </span>
                <h4>Open time</h4>
                <p>10:00 am to 23:00 pm</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 text-center">
              <div className="contact__widget">
                <span className="icon_mail_alt">
                  <MailOutlineIcon sx={{ fontSize: 40 }} />
                </span>
                <h4>Email</h4>
                <p>hello@colorlib.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section End */}
    </>
  );
}
