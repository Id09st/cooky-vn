import React, { useState, useEffect } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useParams } from 'react-router-dom';

const ImageSlider = () => {
  const { id } = useParams();
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState([]);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent((current) => (current === length - 1 ? 0 : current + 1));
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://cookyzz.azurewebsites.net/api/Recipes/${id}`); // Thay đổi đường dẫn tới file JSON của bạn
        if (response.ok) {
          const data = await response.json();
          const imageUrls = data.image.split('\n');
          setSlides(imageUrls);
        } else {
          throw new Error('Error fetching data');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [length, nextSlide]);

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className="slider">
      <ArrowBackIosIcon className="slider-icon left-arrow" onClick={prevSlide} />
      {slides.map((url, index) => (
        <div className={index === current ? 'slide active' : 'slide'} key={index}>
          {index === current && <img src={url} alt="food" style={{ width: '375.85px', height: '375.85px' }} />}
        </div>
      ))}
      <ArrowForwardIosIcon className="slider-icon right-arrow" onClick={nextSlide} />
    </section>
  );
};

export default ImageSlider;
