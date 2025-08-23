import express from 'express';
import { register, login, getProfile, updateProfile } from '../controllers/index.js';
import { verifyToken, isStaff, isStudent } from '../middleware/auth.js';

const router = express.Router();

// Auth routes
router.post('/auth/register', register);
router.post('/auth/login', login);

// Protected routes
router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);

// Staff-only routes
router.get('/staff/dashboard', verifyToken, isStaff, (req, res) => {
    res.json({ message: 'Staff dashboard data' });
});

// Staff order management routes
import { getAllOrders, getOrdersByStatus, updateOrderStatus, getOrderStats } from '../controllers/orders.js';

router.get('/staff/orders', verifyToken, isStaff, getAllOrders);
router.get('/staff/orders/stats', verifyToken, isStaff, getOrderStats);
router.get('/staff/orders/status/:status', verifyToken, isStaff, getOrdersByStatus);
router.put('/staff/orders/:orderId/status', verifyToken, isStaff, updateOrderStatus);

// Student-only routes
router.get('/student/dashboard', verifyToken, isStudent, (req, res) => {
    res.json({ message: 'Student dashboard data' });
});

// Wishlist routes
import { getUserWishlist, addToWishlist, removeFromWishlist } from '../controllers/wishlist.js';

router.get('/wishlist', verifyToken, getUserWishlist);
router.post('/wishlist', verifyToken, addToWishlist);
router.delete('/wishlist/:menuItemId', verifyToken, removeFromWishlist);

export default router;