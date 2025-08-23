import React, { useState } from 'react';
import './Feedback.css';

const Feedback = () => {
  const [feedbackType, setFeedbackType] = useState('general');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    mealRating: 0,
    serviceRating: 0,
    cleanlinessRating: 0,
    valueRating: 0,
    mealName: '',
    suggestions: '',
    contactPreference: 'email'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (newRating, ratingType = 'general') => {
    if (ratingType === 'general') {
      setRating(newRating);
    } else {
      setFormData(prev => ({
        ...prev,
        [ratingType]: newRating
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Feedback submitted:', { feedbackType, rating, formData });
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setRating(0);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        mealRating: 0,
        serviceRating: 0,
        cleanlinessRating: 0,
        valueRating: 0,
        mealName: '',
        suggestions: '',
        contactPreference: 'email'
      });
    }, 3000);
  };

  const renderStars = (currentRating, hoverRating, onRatingChange, size = 'medium') => {
    const stars = [];
    const maxRating = 5;
    const starSize = size === 'large' ? '2rem' : '1.5rem';

    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= (hoverRating || currentRating) ? 'filled' : ''}`}
          onClick={() => onRatingChange(i)}
          onMouseEnter={() => setHoverRating(i)}
          onMouseLeave={() => setHoverRating(0)}
          style={{ fontSize: starSize }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const feedbackTypes = [
    { id: 'general', label: 'General Feedback', icon: '💬' },
    { id: 'meal', label: 'Meal Quality', icon: '🍽️' },
    { id: 'service', label: 'Service Quality', icon: '👨‍🍳' },
    { id: 'suggestion', label: 'Suggestions', icon: '💡' },
    { id: 'complaint', label: 'Complaint', icon: '⚠️' }
  ];

  const ratingLabels = {
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Very Good',
    5: 'Excellent'
  };

  return (
    <div className="feedback-container">
      <div className="feedback-header">
        <h1>📝 Feedback & Suggestions</h1>
        <p>Help us improve your canteen experience by sharing your thoughts</p>
      </div>

      {isSubmitted && (
        <div className="success-message">
          <div className="success-icon">✅</div>
          <h3>Thank you for your feedback!</h3>
          <p>Your response has been submitted successfully. We'll review it and take necessary actions.</p>
        </div>
      )}

      <div className="feedback-content">
        <div className="feedback-types">
          <h3>Select Feedback Type</h3>
          <div className="type-buttons">
            {feedbackTypes.map(type => (
              <button
                key={type.id}
                className={`type-btn ${feedbackType === type.id ? 'active' : ''}`}
                onClick={() => setFeedbackType(type.id)}
              >
                <span className="type-icon">{type.icon}</span>
                <span className="type-label">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-section">
            <h3>Your Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Overall Rating</h3>
            <div className="rating-container">
              <div className="stars-container">
                {renderStars(rating, hoverRating, handleRatingChange, 'large')}
              </div>
              <p className="rating-label">
                {rating > 0 ? ratingLabels[rating] : 'Click to rate'}
              </p>
            </div>
          </div>

          {feedbackType === 'meal' && (
            <div className="form-section">
              <h3>Meal-Specific Feedback</h3>
              <div className="form-group">
                <label htmlFor="mealName">Meal Name</label>
                <input
                  type="text"
                  id="mealName"
                  name="mealName"
                  value={formData.mealName}
                  onChange={handleInputChange}
                  placeholder="e.g., Grilled Chicken Biryani"
                />
              </div>
              
              <div className="detailed-ratings">
                <div className="rating-item">
                  <label>Food Quality</label>
                  <div className="stars-container">
                    {renderStars(formData.mealRating, hoverRating, (rating) => handleRatingChange(rating, 'mealRating'))}
                  </div>
                </div>
                <div className="rating-item">
                  <label>Service Speed</label>
                  <div className="stars-container">
                    {renderStars(formData.serviceRating, hoverRating, (rating) => handleRatingChange(rating, 'serviceRating'))}
                  </div>
                </div>
                <div className="rating-item">
                  <label>Cleanliness</label>
                  <div className="stars-container">
                    {renderStars(formData.cleanlinessRating, hoverRating, (rating) => handleRatingChange(rating, 'cleanlinessRating'))}
                  </div>
                </div>
                <div className="rating-item">
                  <label>Value for Money</label>
                  <div className="stars-container">
                    {renderStars(formData.valueRating, hoverRating, (rating) => handleRatingChange(rating, 'valueRating'))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="form-section">
            <h3>Your Feedback</h3>
            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Brief description of your feedback"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Detailed Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Please provide detailed feedback about your experience..."
                rows="6"
                required
              />
            </div>

            {feedbackType === 'suggestion' && (
              <div className="form-group">
                <label htmlFor="suggestions">Suggestions for Improvement</label>
                <textarea
                  id="suggestions"
                  name="suggestions"
                  value={formData.suggestions}
                  onChange={handleInputChange}
                  placeholder="What would you like to see improved or added?"
                  rows="4"
                />
              </div>
            )}
          </div>

          <div className="form-section">
            <h3>Contact Preferences</h3>
            <div className="contact-preferences">
              <label>
                <input
                  type="radio"
                  name="contactPreference"
                  value="email"
                  checked={formData.contactPreference === 'email'}
                  onChange={handleInputChange}
                />
                Email me updates about my feedback
              </label>
              <label>
                <input
                  type="radio"
                  name="contactPreference"
                  value="phone"
                  checked={formData.contactPreference === 'phone'}
                  onChange={handleInputChange}
                />
                Call me if needed
              </label>
              <label>
                <input
                  type="radio"
                  name="contactPreference"
                  value="none"
                  checked={formData.contactPreference === 'none'}
                  onChange={handleInputChange}
                />
                No follow-up needed
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              <span className="btn-icon">📤</span>
              Submit Feedback
            </button>
            <button type="button" className="reset-btn" onClick={() => window.location.reload()}>
              <span className="btn-icon">🔄</span>
              Reset Form
            </button>
          </div>
        </form>
      </div>

      <div className="feedback-info">
        <div className="info-card">
          <div className="info-icon">📧</div>
          <h4>Email Support</h4>
          <p>canteen@faculty.edu</p>
        </div>
        <div className="info-card">
          <div className="info-icon">📞</div>
          <h4>Phone Support</h4>
          <p>+91 123-456-7890</p>
        </div>
        <div className="info-card">
          <div className="info-icon">⏰</div>
          <h4>Response Time</h4>
          <p>Within 24-48 hours</p>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
