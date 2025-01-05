// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import './Navbar.css';

const Navbar = () => {
    const { signOut } = useAuthenticator();

    return (
        <nav className="navbar">
            <div className="navbar-header">
                <h1>AWS AmazonIQ</h1>
            </div>
            <div className="navbar-links">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/feedback">Feedback</Link>
                <button
                    onClick={signOut}
                    className="signout-button"
                >
                    Sign Out
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
