import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    order_date: {
        type: Date,
        default: Date.now
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Menu',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true
        }
    }],
    status: {
        type: String,
        enum: ['pending', 'preparing', 'ready', 'completed', 'cancelled'],
        default: 'pending'
    },
    total_price: {
        type: Number,
        required: true
    },
    payment_type: {
        type: String,
        enum: ['Card', 'PaymentGateway', 'DigitalWallet'],
        default: 'Card'
    },
    payment_status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    meal_type: {
        type: String,
        enum: ['snack', 'drink', 'Pre Order'],
        required: true
    },
    notes: {
        type: String
    }
}, {
    timestamps: true // This will automatically add createdAt and updatedAt fields
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
