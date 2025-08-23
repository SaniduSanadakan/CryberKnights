import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    order_date: {
        type: Date,
        default: Date.now
    },
    student_id: {
        type: Number,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    token_id: {
        type: Number,
        required: true
    },
    total_price: {
        type: mongoose.Decimal128,
        required: true
    },
    payment_type: {
        type: String,
        enum: ['Card', 'PaymentGateway', 'DigitalWallet'],
        default: 'Card'
    },
    meal_type: {
        type: String,
        enum: ['snack', 'drink', 'Pre Order'],
        required: true
    }
}, {
    timestamps: true // This will automatically add createdAt and updatedAt fields
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
