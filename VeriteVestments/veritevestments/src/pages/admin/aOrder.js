import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/layout';
import './order.css';
function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [editedOrderId, setEditedOrderId] = useState(null);
    const [newOrder, setNewOrder] = useState({
        product_id: '',
        size: '',
        quantity: '',
    });

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/orders')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setOrders(data);
            })
            .catch(error => {
                console.error('Помилка отримання замовлень:', error);
            });

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
                console.error('Помилка отримання товарів:', error);
            });
    }, []);

    const handleEdit = (orderId) => {
        setEditedOrderId(orderId);
    };

    const handleDelete = (orderId) => {
        fetch(`http://127.0.0.1:8000/api/orders/${orderId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    const updatedOrders = orders.filter((order) => order.id !== orderId);
                    setOrders(updatedOrders);
                } else {
                    throw new Error('Failed to delete order');
                }
            })
            .catch((error) => {
                console.error('Error deleting order:', error);
            });
    };

    const handleSizeChange = (event, orderId) => {
        const newSize = event.target.value;
        const updatedOrders = orders.map(order => {
            if (order.id === orderId) {
                return { ...order, size: newSize };
            }
            return order;
        });
        setOrders(updatedOrders);
    };

    const handleQuantityChange = (event, orderId) => {
        const newQuantity = event.target.value;
        const updatedOrders = orders.map(order => {
            if (order.id === orderId) {
                return { ...order, quantity: newQuantity };
            }
            return order;
        });
        setOrders(updatedOrders);
    };

    const handleProductChange = (event, orderId) => {
        const newProductId = event.target.value;
        const updatedOrders = orders.map(order => {
            if (order.id === orderId) {
                return { ...order, product_id: newProductId };
            }
            return order;
        });
        setOrders(updatedOrders);
    };
    const handleSave = async () => {
        try {
            const editedOrder = orders.find(order => order.id === editedOrderId);
            const response = await fetch(`http://127.0.0.1:8000/api/orders/${editedOrderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    size: editedOrder.size,
                    quantity: editedOrder.quantity,
                    product_id: editedOrder.product_id,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setEditedOrderId(null);
        } catch (error) {
            console.error('Помилка збереження замовлення:', error);
        }
    };
    const handleCreateOrder = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newOrder),
            });

            if (!response.ok) {
                throw new Error('Failed to create order');
            }

            const data = await response.json();
            setOrders([...orders, data]); 

            setNewOrder({
                product_id: '',
                size: '',
                quantity: '',
            });
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };
    return (
        <Layout>
            <div className='container'>
                <h2>Create New Order</h2>
                <form onSubmit={handleCreateOrder}>
                    <label htmlFor="product_id">Product ID:</label>
                    <select
                        value={newOrder.product_id}
                        onChange={(e) => setNewOrder({ ...newOrder, product_id: e.target.value })}
                    >
                        <option value="">Select Product</option>
                        {products.map(product => (
                            <option key={product.id} value={product.id}>
                                {product.name} - {product.id}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="size">Size:</label>
                    <input
                        type="text"
                        id="size"
                        value={newOrder.size}
                        onChange={(e) => setNewOrder({ ...newOrder, size: e.target.value })}
                    />

                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        value={newOrder.quantity}
                        onChange={(e) => setNewOrder({ ...newOrder, quantity: e.target.value })}
                    />

                    <button type="submit">Create Order</button>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>OrderID</th>
                            <th>ProductID</th>
                            <th>Size</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>
                                    <select
                                        value={order.product_id}
                                        onChange={(e) => handleProductChange(e, order.id)}
                                        disabled={editedOrderId !== order.id}
                                    >
                                        {products.map(product => (
                                            <option key={product.id} value={product.id}>
                                                {product.name} - {product.id}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={order.size}
                                        onChange={(e) => handleSizeChange(e, order.id)}
                                        disabled={editedOrderId !== order.id}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={order.quantity}
                                        onChange={(e) => handleQuantityChange(e, order.id)}
                                        disabled={editedOrderId !== order.id}
                                    />
                                </td>
                                <td>
                                    {editedOrderId === order.id ? (
                                        <button onClick={handleSave}>Save</button>
                                    ) : (
                                        <button onClick={() => handleEdit(order.id)}>Edit</button>
                                    )}
                                    <button onClick={() => handleDelete(order.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}

export default AdminOrders;
