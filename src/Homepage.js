// Homepage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

const Homepage = () => {
    const navigate = useNavigate();

    const categories = [
        {
            title: "AWS Fundamentals",
            description: "Basic AWS concepts and services",
            path: "/aws-fundamentals"
        },
        {
            title: "Solutions Architect",
            description: "Architect-focused AWS questions",
            path: "/solutions-architect"
        },
        {
            title: "Developer Associate",
            description: "Developer-centric AWS topics",
            path: "/developer"
        },
        {
            title: "SysOps Administrator",
            description: "Operations and administration",
            path: "/sysops"
        },
        {
            title: "Security Specialty",
            description: "AWS security concepts and services",
            path: "/security"
        },
        {
            title: "Database Specialty",
            description: "AWS database services and concepts",
            path: "/database"
        }
    ];

    return (
        <div className="homepage-container">
            <div className="homepage-content">
                <div className="aws-logo"></div>
                <h1>Welcome to AWS AmazonIQ</h1>
                <p>Choose your learning path</p>
                <div className="categories-grid">
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            className="category-button"
                            onClick={() => navigate(category.path)}
                        >
                            <h3>{category.title}</h3>
                            <p>{category.description}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Homepage;
