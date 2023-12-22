import Layout from '../components/layout/layout';
import React, { useState, useEffect } from 'react';
import './cart.css';

function Cart() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/orders')
            .then((response) => response.json())
            .then(async (data) => {
                const ordersWithProductDetails = await Promise.all(
                    data.map(async (order) => {
                        const productResponse = await fetch(`http://127.0.0.1:8000/api/products/${order.product_id}`);
                        const productData = await productResponse.json();

                        const categoryResponse = await fetch(`http://127.0.0.1:8000/api/categories/${productData.category_id}`);
                        const categoryData = await categoryResponse.json();

                        return { ...order, productData, categoryData };
                    })
                );
                setOrders(ordersWithProductDetails);
            })
            .catch((error) => {
                console.error('Error fetching orders:', error);
            });
    }, []);

    const handleQuantityChange = (orderId, newQuantity) => {
        fetch(`http://127.0.0.1:8000/api/orders/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quantity: newQuantity,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    const updatedOrders = orders.map((order) => {
                        if (order.id === orderId) {
                            return { ...order, quantity: newQuantity };
                        }
                        return order;
                    });
                    setOrders(updatedOrders);
                } else {
                    throw new Error('Failed to update quantity');
                }
            })
            .catch((error) => {
                console.error('Error updating quantity:', error);
            });
    };

    const handleDeleteOrder = (orderId) => {
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
    const calculateTotalPrice = () => {
        return orders.reduce((total, order) => {
            const orderPrice = parseFloat(order.productData.price);
            const orderQuantity = parseFloat(order.quantity);
            if (!isNaN(orderPrice) && !isNaN(orderQuantity)) {
                return total + orderPrice * orderQuantity;
            }
            return total;
        }, 0);
    };
    return (
        <Layout>
            <div className="orders-container">
                <h1>Cart</h1>
                <h2>Total Price: {calculateTotalPrice().toFixed(2)}&euro;</h2>
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Size</th>
                                <th>Quantity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>
                                        <img src={order.productData.image1} alt={order.productData.title} style={{ width: '50px', height: '50px' }} />
                                    </td>
                                    <td>{order.productData.title}</td>
                                    <td>{order.productData.name}</td>
                                    <td>{order.categoryData.name}</td>
                                    <td>{order.productData.price}</td>
                                    <td>{order.size}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={order.quantity}
                                            onChange={(e) => handleQuantityChange(order.id, e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteOrder(order.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </Layout>
    );
}

export default Cart;
