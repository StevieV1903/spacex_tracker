import React from 'react';
import logo from '../src/assets/spacex-logo.png';
import './header.css';

const Header = () => {

    return (
<>
        <div className="header">
            <img className="spacex-logo" src={ logo } alt="logo"/>
            <button className="reset-button"><a href='/'>reset launch list</a></button>
        </div>
</>

    );

};

export default Header;