import React from 'react';
import { useSelector } from 'react-redux';

const Card = () => {
  const car = useSelector(state => state.car.selectedCar);

  if (!car) return <p style={{ padding: '10px' }}>Select a car from the carousel to view details.</p>;

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '10px', marginTop: '20px' }}>
      <img src={car.image_url} alt={car.title} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
      <h1 className='card-btn'>{car.prompt}</h1>
      <h2 style={{fontWeight:"bold"}}>{car.short_description}</h2>
      <p>{car.content}</p>
    </div>
  );
};

export default Card;
