import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity must be at least 1']
    }
}, {
    timestamps: true
});

// Create a compound index for order_id and item_id
orderItemSchema.index({ order_id: 1, item_id: 1 });

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

export default OrderItem;
