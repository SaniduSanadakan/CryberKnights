import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
  const [tokens, setTokens] = useState(5); // Default tokens
  const [activeToken, setActiveToken] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Today's special meals
  const todaysSpecials = [
    {
      id: 1,
      name: "Grilled Chicken Biryani",
      price: "₹120",
      description: "Aromatic basmati rice with tender grilled chicken and spices",
      image: "🍗",
      category: "Main Course"
    },
    {
      id: 2,
      name: "Paneer Butter Masala",
      price: "₹90",
      description: "Creamy and rich paneer curry with butter and spices",
      image: "🧀",
      category: "Vegetarian"
    },
    {
      id: 3,
      name: "Chocolate Brownie",
      price: "₹40",
      description: "Warm chocolate brownie with vanilla ice cream",
      image: "🍫",
      category: "Dessert"
    }
  ];

  // All available meals
  const allMeals = [
    ...todaysSpecials,
    {
      id: 4,
      name: "Veg Fried Rice",
      price: "₹80",
      description: "Stir-fried rice with fresh vegetables",
      image: "🍚",
      category: "Main Course"
    },
    {
      id: 5,
      name: "Chicken Curry",
      price: "₹100",
      description: "Spicy chicken curry with onions and tomatoes",
      image: "🍗",
      category: "Main Course"
    },
    {
      id: 6,
      name: "Gulab Jamun",
      price: "₹30",
      description: "Sweet milk dumplings in sugar syrup",
      image: "🍯",
      category: "Dessert"
    }
  ];

  // Allocate token function
  const allocateToken = () => {
    if (tokens > 0 && !activeToken) {
      const newToken = {
        id: Date.now(),
        allocatedAt: new Date(),
        expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
      };
      setActiveToken(newToken);
      setTokens(tokens - 1);
      
      // Auto-expire token after 10 minutes
      setTimeout(() => {
        setActiveToken(null);
      }, 10 * 60 * 1000);
    }
  };

  // Add to wishlist
  const addToWishlist = (meal) => {
    if (!wishlist.find(item => item.id === meal.id)) {
      setWishlist([...wishlist, meal]);
    }
  };

  // Remove from wishlist
  const removeFromWishlist = (mealId) => {
    setWishlist(wishlist.filter(item => item.id !== mealId));
  };

  // Chat functions
  const sendMessage = () => {
    if (chatInput.trim()) {
      const userMessage = {
        id: Date.now(),
        text: chatInput,
        sender: 'user',
        timestamp: new Date()
      };
      
      setChatMessages([...chatMessages, userMessage]);
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 1,
          text: getBotResponse(chatInput),
          sender: 'bot',
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, botResponse]);
      }, 1000);
      
      setChatInput('');
    }
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('menu') || lowerMessage.includes('food')) {
      return "Today's specials include Grilled Chicken Biryani, Paneer Butter Masala, and Chocolate Brownie. You can also check our full menu!";
    } else if (lowerMessage.includes('token') || lowerMessage.includes('queue')) {
      return "You can allocate a token to get food. Each token is valid for 10 minutes and you have " + tokens + " tokens remaining.";
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return "Our meals range from ₹30 to ₹120. Today's specials are at great prices!";
    } else if (lowerMessage.includes('time') || lowerMessage.includes('hours')) {
      return "We're open from 8:00 AM to 8:00 PM, Monday to Friday.";
    } else {
      return "Hello! I'm here to help you with menu information, token allocation, and any other questions about our canteen.";
    }
  };

  // Format time remaining
  const getTimeRemaining = () => {
    if (!activeToken) return null;
    const now = new Date();
    const expiresAt = new Date(activeToken.expiresAt);
    const diff = expiresAt - now;
    
    if (diff <= 0) return "Expired";
    
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Faculty of Technology Canteen</h1>
          <p>Delicious meals, quick service, and smart token system</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">{tokens}</span>
              <span className="stat-label">Tokens Available</span>
            </div>
            <div className="stat">
              <span className="stat-number">{todaysSpecials.length}</span>
              <span className="stat-label">Today's Specials</span>
            </div>
            <div className="stat">
              <span className="stat-number">{wishlist.length}</span>
              <span className="stat-label">Wishlist Items</span>
            </div>
          </div>
        </div>
      </section>

      {/* Token Section */}
      <section className="token-section">
        <div className="container">
          <h2>🍽️ Food Token System</h2>
          <div className="token-card">
            {activeToken ? (
              <div className="active-token">
                <h3>Active Token</h3>
                <div className="token-info">
                  <span className="token-id">#{activeToken.id}</span>
                  <span className="token-time">Time Remaining: {getTimeRemaining()}</span>
                </div>
                <p>Show this token to get your food!</p>
              </div>
            ) : (
              <div className="no-token">
                <h3>No Active Token</h3>
                <p>Allocate a token to get food from the canteen</p>
                <button 
                  className="allocate-btn"
                  onClick={allocateToken}
                  disabled={tokens === 0}
                >
                  {tokens === 0 ? 'No Tokens Left' : 'Allocate Token'}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Today's Specials */}
      <section className="specials-section">
        <div className="container">
          <h2>🌟 Today's Special Meals</h2>
          <div className="meals-grid">
            {todaysSpecials.map(meal => (
              <div key={meal.id} className="meal-card special">
                <div className="meal-image">{meal.image}</div>
                <div className="meal-content">
                  <h3>{meal.name}</h3>
                  <p className="meal-description">{meal.description}</p>
                  <div className="meal-footer">
                    <span className="meal-price">{meal.price}</span>
                    <div className="meal-actions">
                      <button 
                        className="wishlist-btn"
                        onClick={() => addToWishlist(meal)}
                        title="Add to Wishlist"
                      >
                        ❤️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wishlist Section */}
      <section className="wishlist-section">
        <div className="container">
          <h2>💝 Your Wishlist</h2>
          {wishlist.length === 0 ? (
            <div className="empty-wishlist">
              <p>Your wishlist is empty. Add meals you'd like to try!</p>
            </div>
          ) : (
            <div className="wishlist-grid">
              {wishlist.map(meal => (
                <div key={meal.id} className="wishlist-item">
                  <span className="meal-emoji">{meal.image}</span>
                  <span className="meal-name">{meal.name}</span>
                  <span className="meal-price">{meal.price}</span>
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromWishlist(meal.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Chatbot */}
      <div className={`chatbot ${isChatOpen ? 'open' : ''}`}>
        <button 
          className="chat-toggle"
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          {isChatOpen ? '✕' : '💬'}
        </button>
        
        {isChatOpen && (
          <div className="chat-container">
            <div className="chat-header">
              <h3>Canteen Assistant</h3>
              <p>Ask me anything about our menu and services!</p>
            </div>
            
            <div className="chat-messages">
              {chatMessages.map(message => (
                <div 
                  key={message.id} 
                  className={`message ${message.sender}`}
                >
                  <div className="message-content">
                    {message.text}
                  </div>
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="chat-input">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
