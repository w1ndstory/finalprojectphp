import React from 'react';
import Info from '../header/top/info';
import Menu from '../header/bottom/menu';
import AMenu from '../../pages/admin/amenu';
import Footer from '../footer/footer';
function Layout(props) {
    return (    
        <>
            <AMenu/>
            <Info/>
            <Menu/>
            {props.children}
            <Footer/>
        </>
    );
  }
  
  export default Layout;