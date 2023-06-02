import React from 'react';
import '~/sass/_footer.scss';
import '~/sass/_responsive.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookMessenger, faGooglePlus } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="footer spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="footer__about">
              <ul>
                <li>Address: FPT University</li>
                <li>Phone: +84</li>
                <li>Email: @fpt.edu.vn</li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="footer__widget">
              <h6>Join Our Newsletter Now</h6>
              <p>Get E-mail updates about our latest shop and special offers.</p>
              <form action="#">
                <input type="text" placeholder="Enter your mail"></input>
                <button type="submit" className="site-btn">
                  Subscribe
                </button>
              </form>
              <div className="footer__widget__social">
                <a href="#">
                  <FontAwesomeIcon icon={faFacebookMessenger} bounce size="xl" style={{ color: '#478eff' }} />
                </a>
                <a href="#">
                  <FontAwesomeIcon icon={faGooglePlus} bounce size="xl" style={{ color: '#d50101' }} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container text-center">
        <div className="footer__copyright">
          <div className="footer__copyright__text__center">
            <p>
              Copyright &copy;
              <script>document.write(new Date().getFullYear());</script>
              All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
