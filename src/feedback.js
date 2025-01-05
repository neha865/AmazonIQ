// Feedback.js
import React, { useState, useEffect } from 'react';
import './feedback.css';

const Feedback = () => {
    const [feedback, setFeedback] = useState({
        name: '',
        email: '',
        type: 'general',
        message: '',
        rating: 5
    });
    const [submitted, setSubmitted] = useState(false);
    const [allFeedbacks, setAllFeedbacks] = useState([]);

    // Load existing feedbacks when component mounts
    useEffect(() => {
        const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
        setAllFeedbacks(storedFeedbacks);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newFeedback = {
            ...feedback,
            id: Date.now(),
            submittedAt: new Date().toISOString()
        };

        // Update localStorage and state
        const updatedFeedbacks = [...allFeedbacks, newFeedback];
        localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbacks));
        setAllFeedbacks(updatedFeedbacks);

        // Show success message
        setSubmitted(true);

        // Reset form
        setTimeout(() => {
            setSubmitted(false);
            setFeedback({
                name: '',
                email: '',
                type: 'general',
                message: '',
                rating: 5
            });
        }, 3000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeedback(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Render stars for rating display
    const renderStars = (rating) => {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    };

    return (
        <div className="feedback-page">
            <div className="feedback-container">
                <div className="form-section">
                    {submitted ? (
                        <div className="success-message">
                            <h3>Thank you for your feedback!</h3>
                            <p>We appreciate your input.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <h2>Send us your feedback</h2>

                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={feedback.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={feedback.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="type">Feedback Type:</label>
                                <select
                                    id="type"
                                    name="type"
                                    value={feedback.type}
                                    onChange={handleChange}
                                >
                                    <option value="general">General</option>
                                    <option value="bug">Bug Report</option>
                                    <option value="feature">Feature Request</option>
                                    <option value="content">Content Related</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="rating">Rating:</label>
                                <div className="rating-input">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            className={`star ${feedback.rating >= star ? 'filled' : ''}`}
                                            onClick={() => setFeedback(prev => ({ ...prev, rating: star }))}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Your Feedback:</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={feedback.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                />
                            </div>

                            <button type="submit" className="submit-feedback-btn">
                                Submit Feedback
                            </button>
                        </form>
                    )}
                </div>

                {/* Feedback List Section */}
                <div className="feedback-list-section">
                    <h2>Recent Feedbacks</h2>
                    {allFeedbacks.length === 0 ? (
                        <p className="no-feedback">No feedbacks submitted yet.</p>
                    ) : (
                        <div className="feedback-list">
                            {allFeedbacks.slice().reverse().map((item) => (
                                <div key={item.id} className="feedback-card">
                                    <div className="feedback-header">
                                        <span className="feedback-name">{item.name}</span>
                                        <span className="feedback-date">
                                            {new Date(item.submittedAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="feedback-type">{item.type}</div>
                                    <div className="feedback-rating">
                                        <span className="stars">{renderStars(item.rating)}</span>
                                    </div>
                                    <div className="feedback-message">{item.message}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Feedback;
