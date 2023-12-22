import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './amenu.css';

function Menu() {

    return (
        <div className="menu-container">
            <div className="menu-block">
                <Link to="/manage_order" className="menu-elem"><h3>Orders</h3></Link>
                <Link to="/manage_category" className="menu-elem"><h3>Categories</h3></Link>
                <Link to="/manage_country" className="menu-elem"><h3>Countries</h3></Link>
                <Link to="/manage_product" className="menu-elem"><h3>Products</h3></Link>
            </div>
        </div>
    );
}

export default Menu;
