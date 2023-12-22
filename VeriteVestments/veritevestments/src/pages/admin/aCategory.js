import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/layout';

function CategoryManagement() {
    const [categories, setCategories] = useState([]);
    const [editedCategory, setEditedCategory] = useState({ id: null, name: '' });
    const [newCategory, setNewCategory] = useState({ name: '' });
    useEffect(() => {
        fetchCategories();
    }, []);
    const handleCreateCategory = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCategory),
            });

            if (!response.ok) {
                throw new Error('Failed to create category');
            }

            const data = await response.json();
            setCategories([...categories, data]);

            setNewCategory({ name: '' });
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    const handleInputChangeCategory = (e) => {
        setNewCategory({ ...newCategory, name: e.target.value });
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

    const handleEditCategory = (category) => {
        setEditedCategory({ id: category.id, name: category.name });
    };

    const handleSaveCategory = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/categories/${editedCategory.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: editedCategory.name }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            fetchCategories();
            setEditedCategory({ id: null, name: '' });
        } catch (error) {
            console.error('Помилка оновлення категорії:', error);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/categories/${categoryId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            fetchCategories();
        } catch (error) {
            console.error('Помилка видалення категорії:', error);
        }
    };

    const handleInputChange = (e) => {
        setEditedCategory({ ...editedCategory, name: e.target.value });
    };

    return (
        <Layout>
            <div className='container'>
                <h2>Create New Category</h2>
                <form onSubmit={handleCreateCategory}>
                    <label htmlFor="categoryName">Category Name:</label>
                    <input
                        type="text"
                        id="categoryName"
                        value={newCategory.name}
                        onChange={handleInputChangeCategory}
                    />
                    <button type="submit">Create Category</button>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Category ID</th>
                            <th>Category Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>
                                    {editedCategory.id === category.id ? (
                                        <input
                                            type='text'
                                            value={editedCategory.name}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        category.name
                                    )}
                                </td>
                                <td>
                                    {editedCategory.id === category.id ? (
                                        <button onClick={handleSaveCategory}>Save</button>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEditCategory(category)}>Edit</button>
                                            <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}

export default CategoryManagement;
