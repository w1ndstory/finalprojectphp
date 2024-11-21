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
        status: '',
        cost: '',
        reason: '',
    });

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/orders')
            .then(response => response.json())
            .then(data => setOrders(data))
            .catch(error => console.error('Помилка отримання замовлень:', error));

        fetch('http://127.0.0.1:8000/api/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Помилка отримання товарів:', error));
    }, []);

    const handleEdit = (orderId) => {
        setEditedOrderId(orderId);
    };
    const handleFieldChange = (event, orderId, fieldName) => {
        const newValue = event.target.value;
        const updatedOrders = orders.map(order => {
            if (order.id === orderId) {
                return { ...order, [fieldName]: newValue };
            }
            return order;
        });
        setOrders(updatedOrders);
    };
    const handleDelete = (orderId) => {
        fetch(`http://127.0.0.1:8000/api/orders/${orderId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    const updatedOrders = orders.filter(order => order.id !== orderId);
                    setOrders(updatedOrders);
                } else {
                    throw new Error('Failed to delete order');
                }
            })
            .catch(error => console.error('Error deleting order:', error));
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
                    status: editedOrder.status,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const updatedOrder = await response.json();
            setOrders(orders.map(order => (order.id === editedOrderId ? updatedOrder : order)));
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
            const responseData = await response.json();
            console.log('Server response:', responseData);

            if (!response.ok) {
                console.error('Response status:', response.status);
                console.error('Response error:', responseData);
                throw new Error('Failed to create order');
            }
            setOrders([...orders, responseData]);
            setNewOrder({
                product_id: '',
                size: '',
                quantity: '',
            });
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };
    const handleDownloadNP = () => {
        fetch('http://127.0.0.1:8000/api/reports/download-pending-payments', {
            method: 'GET',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to download report');
                }
                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'pending_payments_report.csv';
                document.body.appendChild(a);
                a.click();
                a.remove();
            })
            .catch(error => {
                console.error('Error downloading report:', error);
            });
    };
    const handleDownloadSO = () => {
        fetch('http://127.0.0.1:8000/api/reports/download-max-size-orders', {
            method: 'GET',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to download report');
                }
                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'size_xl_orders.csv';
                document.body.appendChild(a);
                a.click();
                a.remove();
            })
            .catch(error => {
                console.error('Error downloading report:', error);
            });
    };

    return (
        <Layout>
            <div className="container">
                <h2>Manage Orders</h2>
                <button onClick={handleDownloadNP}>Download NPO</button>
                <button onClick={handleDownloadSO}>Download SO</button>
                <form onSubmit={handleCreateOrder}>
                    <label htmlFor="client_name">Client Name:</label>
                    <input
                        type="text"
                        id="client_name"
                        value={newOrder.client_name}
                        onChange={(e) => setNewOrder({ ...newOrder, client_name: e.target.value })}
                        required
                    />
                    <label htmlFor="product_id">Product ID:</label>
                    <select
                        value={newOrder.product_id}
                        onChange={(e) => setNewOrder({ ...newOrder, product_id: e.target.value })}
                        required
                    >
                        <option value="">Select Product</option>
                        {products.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.name} - {product.id}
                            </option>
                        ))}
                    </select>
    
                    <label htmlFor="size">Size:</label>
                    <select
                        value={newOrder.size}
                        onChange={(e) => setNewOrder({ ...newOrder, size: e.target.value })}
                        required
                    >
                        <option value="">Select Size</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
    
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        value={newOrder.quantity}
                        onChange={(e) => setNewOrder({ ...newOrder, quantity: e.target.value })}
                        required
                    />
    
                    <label htmlFor="status">Status:</label>
                    <select
                        value={newOrder.status}
                        onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="Not Payed">Not Payed</option>
                        <option value="Payed">Payed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <button type="submit">Create Order</button>
                </form>
    
                <table>
                    <thead>
                        <tr>
                            <th>OrderID</th>
                            <th>Client Name</th>
                            <th>ProductID</th>
                            <th>Size</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Expected Payment Date</th>
                            <th>Actions</th>         
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>
                                    <input
                                        type="text"
                                        value={order.client_name}
                                        onChange={(e) => handleFieldChange(e, order.id, "client_name")}
                                        disabled={editedOrderId !== order.id}
                                    />
                                </td>
                                <td>
                                    <select
                                        value={order.product_id}
                                        onChange={(e) => handleFieldChange(e, order.id, "product_id")}
                                        disabled={editedOrderId !== order.id}
                                    >
                                        {products.map((product) => (
                                            <option key={product.id} value={product.id}>
                                                {product.name} - {product.id}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <select
                                        value={order.size}
                                        onChange={(e) => handleFieldChange(e, order.id, "size")}
                                        disabled={editedOrderId !== order.id}
                                    >
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={order.quantity}
                                        onChange={(e) => handleFieldChange(e, order.id, "quantity")}
                                        disabled={editedOrderId !== order.id}
                                    />
                                </td>
                                <td>
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleFieldChange(e, order.id, "status")}
                                        disabled={editedOrderId !== order.id}
                                    >
                                        <option value="Not Payed">Not Payed</option>
                                        <option value="Payed">Payed</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </td>
                                <td>{order.expected_payment_date}</td>
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