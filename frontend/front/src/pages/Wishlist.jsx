import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Wishlist.css';

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchWishlist = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            const response = await axios.get('http://localhost:5000/api/wishlist', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setWishlistItems(response.data.items);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching wishlist');
            setLoading(false);
        }
    };

    const removeFromWishlist = async (menuItemId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/wishlist/${menuItemId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Refresh wishlist after removing item
            fetchWishlist();
        } catch (err) {
            setError(err.response?.data?.message || 'Error removing item from wishlist');
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="wishlist-container">
            <h1>My Wishlist</h1>
            {wishlistItems.length === 0 ? (
                <p>Your wishlist is empty</p>
            ) : (
                <div className="wishlist-items">
                    {wishlistItems.map((item) => (
                        <div key={item._id} className="wishlist-item">
                            {item.menuItem.image && (
                                <img 
                                    src={item.menuItem.image} 
                                    alt={item.menuItem.name} 
                                    className="item-image"
                                />
                            )}
                            <div className="item-details">
                                <h3>{item.menuItem.name}</h3>
                                <p>{item.menuItem.description}</p>
                                <p className="price">Rs. {item.menuItem.price.toFixed(2)}</p>
                                <button 
                                    onClick={() => removeFromWishlist(item.menuItem._id)}
                                    className="remove-button"
                                >
                                    Remove from Wishlist
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
