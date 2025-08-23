import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    min_quantity: {
        type: Number,
        required: true,
        default: 0
    },
    last_updated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Stock = mongoose.model('Stock', stockSchema);

export default Stock;
