import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars, selectCar } from '../features/carSlice';
import './Carousal.css'; // Create this CSS file
 
const Carousel = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector(state => state.car);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchCars());
  }, [dispatch, status]);

  useEffect(() => {
    dispatch(selectCar(null));
  }, []);

  // Auto-scroll every 3 seconds
  useEffect(() => {
    if (!carouselRef.current || items.length === 0) return;

    const interval = setInterval(() => {
      const container = carouselRef.current;
      const itemWidth = container.firstChild?.offsetWidth || 0;
      container.scrollBy({ left: itemWidth + 16, behavior: 'smooth' });

      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [items]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Failed to load data</p>;

  return (
    <div
      ref={carouselRef}
      className="carousel-container"
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          onClick={() => dispatch(selectCar(item))}
          className="carousel-item"
          style={{ animationDelay: `${idx * 0.2}s` }} // staggered animation
        >
          <img
            src={item.image_url}
            alt={item.title}
            className="carousel-image"
          />
          <h4 className="carousel-title">{item.title}</h4>
          <p className="carousel-content">{item.content.slice(0, 30)}</p>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
