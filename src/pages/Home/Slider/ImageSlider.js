import React, { useState, useEffect } from 'react';
import { Categories } from '../HomImage';

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
    const interval = setInterval(nextSlide, 3000); // Chuyển slide sau mỗi 3 giây
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className="slider">
      {Categories.map((categories, index) => {
        return (
          <div className={index === current ? 'slide active' : 'slide'} key={index}>
            {index === current && <img src={slider.url} alt="food" className="image" />}
          </div>
        );
      })}
    </section>
  );
};

export default ImageSlider;
