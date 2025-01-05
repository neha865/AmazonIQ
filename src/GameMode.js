// GameMode.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './GameMode.css';

const GameMode = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const category = location.pathname.split('/')[1]; // Get the category from URL

    const startSinglePlayerGame = () => {
        navigate(`/${category}/single-player`);
    };

    const startDoublePlayerGame = () => {
        navigate(`/${category}/double-player`);
    };

    // Function to get category title
    const getCategoryTitle = () => {
        const titles = {
            'aws-fundamentals': 'AWS Fundamentals',
            'solutions-architect': 'Solutions Architect',
            'developer': 'Developer Associate',
            'sysops': 'SysOps Administrator',
            'security': 'Security Specialty',
            'database': 'Database Specialty'
        };
        return titles[category] || 'Select Game Mode';
    };

    return (
        <div className="gamemode-container">
            <div className="gamemode-content">
                <div className="aws-logo"></div>
                <h1>{getCategoryTitle()}</h1>
                <p>Choose your game mode</p>
                <div className="button-group">
                    <button className="mode-button" onClick={startSinglePlayerGame}>
                        <h3>Single Player</h3>
                        <p>Practice at your own pace</p>
                    </button>
                    <button className="mode-button" onClick={startDoublePlayerGame}>
                        <h3>Double Player</h3>
                        <p>Compete with a friend</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameMode;
