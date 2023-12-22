import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/layout';

function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [editedProductId, setEditedProductId] = useState(null);
    const [editedProduct, setEditedProduct] = useState({
        categoryId: '',
        title: '',
        name: '',
        description: '',
        featured: '',
        material: '',
        price: '',
        madeInId: '',
        image1: '',
        image2: '',
        image3: '',
        image4: '',
    });
    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([]);
    const [madeIns, setMadeIns] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProducts(data);
            })
            .catch(error => {
                console.error('Помилка отримання продуктів:', error);
            });
    }, []);

    const handleEdit = (productId) => {
        const selectedProduct = products.find(product => product.id === productId);
        const editedProductCopy = { ...selectedProduct };
        setEditedProductId(productId);
        setEditedProduct(editedProductCopy);
    };
    const handleCategoryChange = (event) => {
        const newCategoryId = event.target.value;
        setEditedProduct(prevState => ({
            ...prevState,
            categoryId: newCategoryId,
        }));
    };

    const handleMadeInChange = (event) => {
        const newMadeInId = event.target.value;
        setEditedProduct(prevState => ({
            ...prevState,
            madeInId: newMadeInId,
        }));
    };


    const handleSave = async () => {
        try {
            const editedProductData = {
                categoryId: editedProduct.categoryId,
                title: editedProduct.title,
                name: editedProduct.name,
                description: editedProduct.description,
                featured: editedProduct.featured,
                material: editedProduct.material,
                price: editedProduct.price,
                madeInId: editedProduct.madeInId,
                image1: editedProduct.image1,
                image2: editedProduct.image2,
                image3: editedProduct.image3,
                image4: editedProduct.image4,
            };

            const response = await fetch(`http://127.0.0.1:8000/api/products/${editedProduct.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedProductData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setEditedProductId(null);

            const updatedProducts = products.map(product =>
                product.id === editedProduct.id ? editedProduct : product
            );
            setProducts(updatedProducts);
        } catch (error) {
            console.error('Помилка збереження продукту:', error);
        }
    };


    const handleDelete = async (productId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/products/${productId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete product');
            }

            const updatedProducts = products.filter(product => product.id !== productId);
            setProducts(updatedProducts);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleChange = (e, field) => {
        const value = e.target.value;
        setEditedProduct(prevState => ({
            ...prevState,
            [field]: value,
        }));
    };
    const fetchCategories = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/categories');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Помилка отримання категорій:', error);
        }
    };

    const fetchCountries = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/countries');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCountries(data); // Оновлення стану країн
        } catch (error) {
            console.error('Помилка отримання країн:', error);
        }
    };

    const fetchMadeIns = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/countries');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setMadeIns(data);
        } catch (error) {
            console.error('Помилка отримання madeIns:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchCountries();
        fetchMadeIns();
    }, []);

    return (
        <Layout>
            <div className='container'>
                <h2>Product Management</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Category ID</th>
                            <th>Title</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Featured</th>
                            <th>Material</th>
                            <th>Price</th>
                            <th>MadeIn ID</th>
                            <th>Image 1</th>
                            <th>Image 2</th>
                            <th>Image 3</th>
                            <th>Image 4</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>
                                    {editedProductId === product.id ? (
                                        <select
                                            value={editedProduct.categoryId}
                                            onChange={handleCategoryChange}
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map(category => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name} - {category.id}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type="text"
                                            value={`${product.category_id}`}
                                            readOnly
                                        />
                                    )}
                                </td>
                                <td>
                                    {editedProductId === product.id ? (
                                        <input
                                            type='text'
                                            value={editedProduct.title}
                                            onChange={(e) => handleChange(e, 'title')}
                                        />
                                    ) : (
                                        product.title
                                    )}
                                </td>
                                <td>
                                    {editedProductId === product.id ? (
                                        <input
                                            type='text'
                                            value={editedProduct.name}
                                            onChange={(e) => handleChange(e, 'name')}
                                        />
                                    ) : (
                                        product.name
                                    )}
                                </td>
                                <td>
                                    {editedProductId === product.id ? (
                                        <input
                                            type='text'
                                            value={editedProduct.description}
                                            onChange={(e) => handleChange(e, 'description')}
                                        />
                                    ) : (
                                        product.description
                                    )}
                                </td>
                                <td>
                                    {editedProductId === product.id ? (
                                        <input
                                            type='text'
                                            value={editedProduct.featured}
                                            onChange={(e) => handleChange(e, 'featured')}
                                        />
                                    ) : (
                                        product.featured
                                    )}
                                </td>
                                <td>
                                    {editedProductId === product.id ? (
                                        <input
                                            type='text'
                                            value={editedProduct.material}
                                            onChange={(e) => handleChange(e, 'material')}
                                        />
                                    ) : (
                                        product.material
                                    )}
                                </td>
                                <td>
                                    {editedProductId === product.id ? (
                                        <input
                                            type='text'
                                            value={editedProduct.price}
                                            onChange={(e) => handleChange(e, 'price')}
                                        />
                                    ) : (
                                        product.price
                                    )}
                                </td>
                                <td>
                                    {editedProductId === product.id ? (
                                        <select
                                            value={editedProduct.madeInId}
                                            onChange={handleMadeInChange}
                                        >
                                            <option value="">Select Made In</option>
                                            {madeIns.map(madeIn => (
                                                <option key={madeIn.id} value={madeIn.id}>
                                                    {madeIn.name} - {madeIn.id}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type="text"
                                            value={`${product.madein_id}`}
                                            readOnly
                                        />
                                    )}
                                </td>
                                <td>
                                    {editedProductId === product.id ? (
                                        <input
                                            type='text'
                                            value={editedProduct.image1}
                                            onChange={(e) => handleChange(e, 'image1')}
                                        />
                                    ) : (
                                        product.image1
                                    )}
                                </td>
                                <td>
                                    {editedProductId === product.id ? (
                                        <input
                                            type='text'
                                            value={editedProduct.image2}
                                            onChange={(e) => handleChange(e, 'image2')}
                                        />
                                    ) : (
                                        product.image2
                                    )}
                                </td>
                                <td>
                                    {editedProductId === product.id ? (
                                        <input
                                            type='text'
                                            value={editedProduct.image3}
                                            onChange={(e) => handleChange(e, 'image3')}
                                        />
                                    ) : (
                                        product.image3
                                    )}
                                </td>
                                <td>
                                    {editedProductId === product.id ? (
                                        <input
                                            type='text'
                                            value={editedProduct.image4}
                                            onChange={(e) => handleChange(e, 'image4')}
                                        />
                                    ) : (
                                        product.image4
                                    )}
                                </td>
                                <td>
                                    {editedProductId === product.id ? (
                                        <button onClick={handleSave}>Save</button>
                                    ) : (
                                        <button onClick={() => handleEdit(product.id)}>Edit</button>
                                    )}
                                    <button onClick={() => handleDelete(product.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}

export default AdminProducts;
