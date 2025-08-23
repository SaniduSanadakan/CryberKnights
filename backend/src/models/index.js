import mongoose from 'mongoose';
import Menu from './menu.js';
import Order from './order.js';
import OrderItem from './orderItem.js';
import Stock from './stock.js';
import Wishlist from './wishlist.js';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['student', 'staff'],
        required: true
    },
    studentId: {
        type: String,
        unique: true,
        sparse: true
    },
    staffId: {
        type: String,
        unique: true,
        sparse: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

export {
    User,
    Menu,
    Order,
    OrderItem,
    Stock,
    Wishlist
};