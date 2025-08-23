import { Wishlist } from '../models/index.js';

// Get user's wishlist
export const getUserWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.user.id })
            .populate('items.menuItem');
        
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }
        
        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching wishlist', error: error.message });
    }
};

// Add item to wishlist
export const addToWishlist = async (req, res) => {
    try {
        const { menuItemId } = req.body;
        let wishlist = await Wishlist.findOne({ user: req.user.id });

        if (!wishlist) {
            wishlist = new Wishlist({
                user: req.user.id,
                items: [{ menuItem: menuItemId }]
            });
        } else {
            // Check if item already exists in wishlist
            const itemExists = wishlist.items.some(item => 
                item.menuItem.toString() === menuItemId
            );

            if (itemExists) {
                return res.status(400).json({ message: 'Item already in wishlist' });
            }

            wishlist.items.push({ menuItem: menuItemId });
        }

        await wishlist.save();
        
        // Populate the menuItem details before sending response
        await wishlist.populate('items.menuItem');
        
        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ message: 'Error adding to wishlist', error: error.message });
    }
};

// Remove item from wishlist
export const removeFromWishlist = async (req, res) => {
    try {
        const { menuItemId } = req.params;
        const wishlist = await Wishlist.findOne({ user: req.user.id });

        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        wishlist.items = wishlist.items.filter(item => 
            item.menuItem.toString() !== menuItemId
        );

        await wishlist.save();
        await wishlist.populate('items.menuItem');
        
        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ message: 'Error removing from wishlist', error: error.message });
    }
};
