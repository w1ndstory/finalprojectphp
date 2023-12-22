import {Link} from 'react-router-dom';
import "./menu.css";
function Menu() {
    return (    
        <>
        <div className="menu-container">
            <div className="menu-block">
                <Link to="/" className="menu-elem"><h3>Home</h3></Link>
                <Link to="/category" className="menu-elem"><h3>Catalog</h3></Link>
                <Link to="/delivery_payment" className="menu-elem"><h3>Delivery & Payment</h3></Link>
                <Link to="/contact" className="menu-elem"><h3>Contact</h3></Link>
            </div>
        </div>
        </>
    );      
  }
  
  export default Menu;