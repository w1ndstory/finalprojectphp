import Layout from '../components/layout/layout';
import "./contact.css";
function Contact() {
    return (
        <>
            <Layout>
                <div className='main-contact-container'>
                    <h1>CONTACT</h1>
                    <div className='contact-content'>
                        <hr/>
                        <label className='contact-label' for="name">Name</label>
                        <input type="text" name="name" className='input-contact'></input>
                        <label className='contact-label' for="email">Email</label>
                        <input type="text" name="email" pattern=".+@globex\.com" className='input-contact'></input>
                        <label className='contact-label' for="subject">Subject</label>
                        <input type="text" name="subject" className='input-contact'></input>
                        <label className='contact-label' for="message">Message</label>
                        <textarea className='contact-label' name="message" type="text"></textarea>
                        <button className='send-message-button'>SEND MESSAGE</button>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Contact;