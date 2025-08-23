import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Sample users for demonstration
  const sampleUsers = [
    {
      id: 1,
      username: 'saman',
      password: 'password123',
      name: 'Saman Perera',
      email: 'saman@example.com',
      role: 'student'
    },
    {
      id: 2,
      username: 'nimal',
      password: 'password123',
      name: 'Nimal Silva',
      email: 'nimal@example.com',
      role: 'student'
    },
    {
      id: 3,
      username: 'admin',
      password: 'admin123',
      name: 'Admin User',
      email: 'admin@canteen.com',
      role: 'admin'
    },
    {
      id: 4,
      username: 'kamal',
      password: 'password123',
      name: 'Kamal Fernando',
      email: 'kamal@example.com',
      role: 'student'
    },
    {
      id: 5,
      username: 'sunil',
      password: 'password123',
      name: 'Sunil Bandara',
      email: 'sunil@example.com',
      role: 'student'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

         // Check if user exists in sample users or registered users
     const registeredUsers = JSON.parse(localStorage.getItem('users') || '[]');
     const allUsers = [...sampleUsers, ...registeredUsers];
     
     const user = allUsers.find(u => 
       u.username === formData.username && u.password === formData.password
     );

    if (user) {
      // Store user data in localStorage (in real app, you'd use proper auth tokens)
      localStorage.setItem('currentUser', JSON.stringify({
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role
      }));
      
      // Redirect to home page
      navigate('/');
    } else {
      setError('Invalid username or password. Please try again.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🍽️ Welcome Back</h1>
          <p>Sign in to your Canteen MIS account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="login-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <a href="/signup">Sign up here</a></p>
        </div>

        {/* Demo Users Info */}
        <div className="demo-users">
          <h3>Demo Users (for testing):</h3>
          <div className="user-list">
            {sampleUsers.map(user => (
              <div key={user.id} className="demo-user">
                <strong>{user.name}</strong>
                <span>Username: {user.username}</span>
                <span>Password: {user.password}</span>
                <span className="role-badge">{user.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
