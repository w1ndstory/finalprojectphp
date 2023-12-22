import { Link } from 'react-router-dom';
import logo from "../../images/LOGO.jpg";
import tiktok from "../../images/tiktok.png"
import youtube from "../../images/youtube.png"
import instagram from "../../images/insta.png"
import "./footer.css";

function Footer() {
    return (
        <>
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-left">
                        <div className="footer-menu">
                            <div className="footer-block">
                                <Link to="/" className="menu-elem"><h3>Home</h3></Link>
                                <Link to="/category" className="menu-elem"><h3>Catalog</h3></Link>
                                <Link to="/delivery_payment" className="footer-elem"><h3>Delivery & Payment</h3></Link>
                                <Link to="/contact" className="footer-elem"><h3>Contact</h3></Link>
                                <p>© 2023 Verite Vestments</p>
                            </div>
                        </div>
                    </div>
                    <div className="footer-center">
                        <div className="logo">
                            <img src={logo} alt="VeriteVestments Logo" />
                        </div>
                    </div>
                    <div className="footer-right">
                        <div className="footer-socials">
                            <a href="https://www.youtube.com">
                                <img src={youtube}></img>
                            </a>
                            <a href="https://www.instagram.com">
                                <img src={instagram}></img>
                            </a>
                            <a href="https://www.tiktok.com">
                                <img src={tiktok}></img>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;