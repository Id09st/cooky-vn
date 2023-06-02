import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';

export default function index({ children }) {
  return (
    <div>
      <Header />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
}
