import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
    item_name: {
        type: String,
        required: true
    },
    price: {
        type: mongoose.Decimal128,
        required: true
    },
    category: {
        type: String,
        enum: ['meal', 'snack', 'pre oder'],
        required: true
    },
    stock_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock',
        default: null
    },
    is_available: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Menu = mongoose.model('Menu', menuSchema);

export default Menu;
