import Layout from "../../components/layout/layout";
import React, { useState, useEffect } from 'react';
import { Route, useParams } from "react-router-dom";
import SlideId from './slide_id';
import './id.css';

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [madeinName, setMadeinName] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [addToBagMessage, setAddToBagMessage] = useState('');
    const [sizeError, setSizeError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                setProduct(data);
                const countryResponse = await fetch(`http://127.0.0.1:8000/api/countries/${data.madein_id}`);
                if (!countryResponse.ok) {
                    throw new Error('Failed to fetch country data');
                }
                const countryData = await countryResponse.json();
                setMadeinName(countryData.name);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        if (product && product.images && product.images.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % product.images.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [product]);

    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
        setSizeError(false);
    };

    const handleAddToBag = () => {
        if (selectedSize) {
          console.log('Sending request with:', product.id, selectedSize); // Добавить эту строку
      
          fetch('http://127.0.0.1:8000/api/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              product_id: product.id,
              size: selectedSize,
              quantity: 1,
            }),
          })
            .then((response) => {
              if (response.ok) {
                setAddToBagMessage('Product added to bag!');
              } else {
                setAddToBagMessage('Failed to add product to bag!');
              }
            })
            .catch((error) => {
              console.error('Error adding to bag:', error);
              setAddToBagMessage('Failed to add product to bag!');
            });
        } else {
          setSizeError(true);
          setAddToBagMessage('Please select a size!');
        }
      };

    if (!product) {
        return <div>Loading...</div>;
    }

    const images = [product.image1, product.image2, product.image3, product.image4];
    const descriptionArray = product.featured.split('|').map((item) => item.trim()).filter((item) => item);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
    return (
        <Layout>
            <div className="product-details-container">
                <div className="thumbnail-images">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`thumbnail-image ${index === currentIndex ? 'selected' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                        >
                            <img className="thumbnail-img-style" src={image} alt={product.title} />
                        </div>
                    ))}
                </div>
                <div className="product-images">
                    <div className="image-swiper">
                        <SlideId imageUrl={images[currentIndex]} />
                        <div className="slider-controls">
                            <button className="slider-control left" onClick={prevSlide}>&#9664;</button>
                            <button className="slider-control right" onClick={nextSlide}>&#9654;</button>
                        </div>
                    </div>
                </div>
                <div className="product-details">
                    <p className="product-title">{product.title}</p>
                    <p className="product-name">{product.name}</p>
                    <p className="product-description">{product.description}</p>
                    <ul className="product-features">
                        {descriptionArray.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                    <p className="product-material">{product.material}</p>
                    <p className="product-made-in">Made in {madeinName}</p>
                    <p className="product-price">&#8364;{product.price} EUR</p>
                    <div className="product-actions">
                        <select className="select-size-element" id="size" onChange={(e) => setSelectedSize(e.target.value)}>
                            <option selected disabled>select a size</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>
                        <button className="add-to-bag" onClick={handleAddToBag}>ADD TO BAG</button>
                        <p style={{ color: 'grey' }}>{addToBagMessage}</p>
                    </div>
                </div>
            </div>
        </Layout>
    );

}

export default ProductDetails;