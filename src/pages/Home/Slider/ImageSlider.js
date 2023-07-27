import React, { useState, useEffect } from 'react';
import { Slider } from '../HomImage';

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent((current) => (current === length - 1 ? 0 : current + 1));
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 10000); // Change slide every 10 seconds
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className="slider">
      <div className="slides-container">
        {slides.map((slider, index) => {
          return (
            <div className={index === current ? 'slide active' : 'slide'} key={index}>
              {index === current && <img src={slider.url} alt="food" className="image" />}
            </div>
          );
        })}
        <div className="dots-container" style={{ paddingBottom: '20px' }}>
          {slides.map((_, index) => (
            <div key={index} className={index === current ? 'dot active' : 'dot'} onClick={() => setCurrent(index)} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageSlider;
