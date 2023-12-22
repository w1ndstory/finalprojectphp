import React, { useState, useEffect } from 'react';
import Slide from './slide';
import banner1 from '../../../images/banner1.jpg';
import banner2 from '../../../images/banner2.jpg';
import banner3 from '../../../images/banner3.jpg';
import './slider.css';
const Slider = () => {
    const images = [
        banner1,
        banner2,
        banner3,
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, [currentIndex]);
    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % images.length);
    };
    const prevSlide = () => {
        setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    };

    return (
        <>
            <div className="slider">
                <button className="slider-control left" onClick={prevSlide}>&#9664;</button>
                <Slide imageUrl={images[currentIndex]} />
                <button className="slider-control right" onClick={nextSlide}>&#9654;</button>
            </div>
            <div className="dots">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    ></span>
                ))}
            </div>
        </>
    );
};

export default Slider;
