import Layout from '../components/layout/layout';
import { Link } from 'react-router-dom';
import womenswearIMG from '../images/womenswear.jpg';
import menswearIMG from '../images/menswear.jpg'
import "./home.css";

function Home() {
    return (
        <>
            <Layout>
                    <div className='main-container'>
                        <div className="block-content-one">
                            <Link to="/category" className="link-to-womenswear">
                                <p>Womenswear</p>
                            </Link>
                        </div>
                        <div className="block-content-two">
                            <Link to="/category" className="link-to-menswear">
                                <p>Menswear</p>
                            </Link>
                        </div>
                    </div>
            </Layout>
        </>
    );
}

export default Home;