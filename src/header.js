import React from 'react';
import logo from '../src/assets/spacex-logo.png';
import refresh from '../src/assets/refresh.png';
import './header.css';

const Header = () => {

    return (
<>
        <div className="header">
            <img className="spacex-logo" src={ logo } alt="logo"/>
            <p className="header-title">LAUNCHES</p>
            <button className="reset-button"><a href='/'>Reload Data </a><img className="refresh" src={ refresh }/></button>
        </div>
</>

    );

};

export default Header;