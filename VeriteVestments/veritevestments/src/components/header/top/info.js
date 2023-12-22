import { Link } from 'react-router-dom';
import "./info.css";
import logo from "../../../images/LOGO.jpg";
import video from "../../../images/video1.mp4"

function Info() {
    return (
        <>
            <div className="info-container">
                <div className="left-section">
                    <img src={logo} alt="VeriteVestments Logo" />
                </div>
                <video className='video-elem' autoPlay loop muted>
                    <source src={video} type="video/mp4" />
                </video>
                <div className="right-section">
                    <div className="search">
                        <input type="text" className="inputSearch" placeholder="Search what you wan't" />
                        <button className='buttonSearch'>Search</button>
                    </div>
                    <div className="cart-link">
                        <Link to="/cart" className="cart-elem"><h3>Cart</h3></Link>
                        <Link to="/delivery_payment" className="cart-elem"><h3>Delivery & Payment</h3></Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Info;