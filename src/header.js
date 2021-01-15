import React from 'react';
import logo from '../src/assets/spacex-logo.png';
import './header.css';

const Header = () => {

    return (
<>
        <div className="header">
            <img className="spacex-logo" src={ logo } alt="logo"/>
            <a href='/'><button>reset launch list</button></a>
        </div>
</>

    );

};

export default Header;