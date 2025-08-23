import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "../config/db.js";
import { User, Menu, Order, OrderItem, Stock } from "../models/index.js";
import apiRoutes from "../routes/api.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
  res.send("API is running...");
});

// API Routes
app.use('/api', apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Available models:', {
    User: !!User,
    Menu: !!Menu,
    Order: !!Order,
    OrderItem: !!OrderItem,
    Stock: !!Stock
  });
});
