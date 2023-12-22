import React from 'react';

const Slide = ({ imageUrl }) => {
  return (
    <div className="slide">
      <img className="slider-img" src={imageUrl} alt="Slide" />
    </div>
  );
};

export default Slide;
