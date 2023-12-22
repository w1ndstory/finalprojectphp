import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/layout';
function CountryManagement() {
    const [countries, setCountries] = useState([]);
    const [editedCountryId, setEditedCountryId] = useState(null);
    const [editedCountryName, setEditedCountryName] = useState('');
    const [newCountry, setNewCountry] = useState({ name: '' });

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/countries')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setCountries(data);
            })
            .catch(error => {
                console.error('Помилка отримання країн:', error);
            });
    }, []);

    const handleEdit = (countryId, countryName) => {
        setEditedCountryId(countryId);
        setEditedCountryName(countryName);
    };
    const handleUpdateCountry = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/countries/${editedCountryId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: editedCountryName }),
            });

            if (!response.ok) {
                throw new Error('Failed to update country');
            }

            const updatedCountries = countries.map(country =>
                country.id === editedCountryId ? { ...country, name: editedCountryName } : country
            );
            setCountries(updatedCountries);
            setEditedCountryId(null);
            setEditedCountryName('');
        } catch (error) {
            console.error('Error updating country:', error);
        }
    }; 

    const handleDelete = (countryId) => {
        fetch(`http://127.0.0.1:8000/api/countries/${countryId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    const updatedCountries = countries.filter((country) => country.id !== countryId);
                    setCountries(updatedCountries);
                } else {
                    throw new Error('Failed to delete country');
                }
            })
            .catch((error) => {
                console.error('Error deleting country:', error);
            });
    };

    const handleInputChangeCountry = (e) => {
        setNewCountry({ ...newCountry, name: e.target.value });
    };

    const handleCreateCountry = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/countries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCountry),
            });

            if (!response.ok) {
                throw new Error('Failed to create country');
            }

            const data = await response.json();
            setCountries([...countries, data]);

            setNewCountry({ name: '' });
        } catch (error) {
            console.error('Error creating country:', error);
        }
    };

    // Рендеринг таблиці країн і форми для створення
    return (
        <Layout>
            <div className='container'>
                <h2>Country Management</h2>
                <form onSubmit={handleCreateCountry}>
                    <label htmlFor="countryName">Country Name:</label>
                    <input
                        type="text"
                        id="countryName"
                        value={newCountry.name}
                        onChange={handleInputChangeCountry}
                    />
                    <button type="submit">Create Country</button>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Country ID</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {countries.map(country => (
                            <tr key={country.id}>
                                <td>{country.id}</td>
                                <td>
                                    {editedCountryId === country.id ? (
                                        <input
                                            type="text"
                                            value={editedCountryName}
                                            onChange={(e) => setEditedCountryName(e.target.value)}
                                        />
                                    ) : (
                                        country.name
                                    )}
                                </td>
                                <td>
                                    {editedCountryId === country.id ? (
                                        <button onClick={handleUpdateCountry}>Save</button>
                                    ) : (
                                        <button onClick={() => handleEdit(country.id, country.name)}>Edit</button>
                                    )}
                                    <button onClick={() => handleDelete(country.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}

export default CountryManagement;
