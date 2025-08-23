import Order from '../models/order.js';

// Get all orders (staff only)
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('student', 'username firstName lastName studentId')
            .populate('items.item', 'name price')
            .sort({ order_date: -1 }); // Most recent first

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};

// Get orders by status (staff only)
export const getOrdersByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const orders = await Order.find({ status })
            .populate('student', 'username firstName lastName studentId')
            .populate('items.item', 'name price')
            .sort({ order_date: -1 });

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};

// Update order status (staff only)
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        ).populate('student', 'username firstName lastName studentId')
         .populate('items.item', 'name price');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error updating order status', error: error.message });
    }
};

// Get order statistics (staff only)
export const getOrderStats = async (req, res) => {
    try {
        const stats = await Order.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                    totalRevenue: { $sum: '$total_price' }
                }
            }
        ]);

        const todayOrders = await Order.countDocuments({
            order_date: {
                $gte: new Date(new Date().setHours(0, 0, 0, 0))
            }
        });

        res.json({
            statusBreakdown: stats,
            todayOrders
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order statistics', error: error.message });
    }
};
