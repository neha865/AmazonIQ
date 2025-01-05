// About.js
import React from 'react';
import './About.css'; // Create a CSS file for styling this page

const About = () => {
    return (
        <div className="about-container">
            <div className="about-content">
                <h1>About AWS AmazonIQ</h1>
                <p>
                    AWS AmazonIQ is a gamified platform designed to help students prepare for
                    AWS certification exams in an engaging and interactive way. The application
                    combines fun and learning to make exam preparation less stressful.
                </p>
                <h2>Resources to Prepare for AWS Exams</h2>
                <ul className="resource-links">
                    <li>
                        <a
                            href="https://aws.amazon.com/certification/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Official AWS Certification Page
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://aws.amazon.com/training/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            AWS Training and Certification
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Udemy AWS Courses
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.whizlabs.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Whizlabs Practice Tests
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://d1.awsstatic.com/training-and-certification/docs/AWS_certification_paths.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            AWS certification paths
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default About;
