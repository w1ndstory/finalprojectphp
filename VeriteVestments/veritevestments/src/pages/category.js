import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Slider from '../components/main/content/slider';
import Layout from '../components/layout/layout';
import "./category.css";

function Category() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    
    const fetchProducts = () => {
        fetch("http://127.0.0.1:8000/api/products")
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error("Error fetching products:", error));
    };
    useEffect(() => {
        fetchProducts();

        fetch("http://127.0.0.1:8000/api/categories")
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error("Error fetching categories:", error));
    }, []);
    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
    };
    const filteredProducts = selectedCategory
        ? products.filter(product => product.category_id === selectedCategory)
        : products;

    return (
        <Layout>
            <div className="main-catalog-container">
                <Slider />
                <div className="category-buttons">
                    <button onClick={() => handleCategoryChange('')} className={selectedCategory === '' ? 'active' : ''}>
                        All
                    </button>
                    {categories.map(category => (
                        <button key={category.id} onClick={() => handleCategoryChange(category.id)} className={selectedCategory === category.id ? 'active' : ''}>
                            {category.name}
                        </button>
                    ))}
                </div>
                <div className="product-list">
                    {filteredProducts.map((product) => (
                        <div className="product-content" key={product.id}>
                            <Link to={`/category/${product.id}`}>
                                <img className="product-image" src={product.image1} alt={product.title} />
                                <p>{product.title}</p>
                                <p>{product.name}</p>
                                <p>{product.price}&#8364;</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default Category;
