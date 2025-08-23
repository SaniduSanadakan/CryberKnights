import React, { useState, useEffect } from 'react';
import './Orders.css';

const Orders = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Get current user from localStorage (in real app, this would come from authentication)
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {
    id: 1,
    name: "Saman Perera",
    username: "saman",
    email: "saman@example.com"
  };

  // Sample user orders data
  useEffect(() => {
    const sampleUserOrders = [
      {
        id: 1,
        orderNumber: "ORD-001",
                 items: [
           { name: "Grilled Chicken Biryani", quantity: 1, price: "Rs. 120" },
           { name: "Tea", quantity: 2, price: "Rs. 10" }
         ],
         totalAmount: "Rs. 140",
        status: "completed",
        orderTime: "2024-01-15 12:30",
        completionTime: "2024-01-15 12:45",
        paymentMethod: "card",
        specialInstructions: "Less spicy please"
      },
      {
        id: 2,
        orderNumber: "ORD-002",
                 items: [
           { name: "Paneer Butter Masala", quantity: 1, price: "Rs. 90" },
           { name: "Veg Fried Rice", quantity: 1, price: "Rs. 80" },
           { name: "Chocolate Brownie", quantity: 1, price: "Rs. 40" }
         ],
         totalAmount: "Rs. 210",
        status: "preparing",
        orderTime: "2024-01-15 13:15",
        estimatedTime: "10 minutes",
        paymentMethod: "cash",
        specialInstructions: ""
      },
      {
        id: 3,
        orderNumber: "ORD-003",
                 items: [
           { name: "Samosa", quantity: 3, price: "Rs. 15" },
           { name: "Coffee", quantity: 1, price: "Rs. 15" }
         ],
         totalAmount: "Rs. 60",
        status: "pending",
        orderTime: "2024-01-15 13:45",
        paymentMethod: "card",
        specialInstructions: "Extra hot coffee"
      },
      {
        id: 4,
        orderNumber: "ORD-004",
                 items: [
           { name: "Chicken Curry", quantity: 1, price: "Rs. 100" },
           { name: "Gulab Jamun", quantity: 2, price: "Rs. 30" }
         ],
         totalAmount: "Rs. 160",
        status: "cancelled",
        orderTime: "2024-01-15 14:00",
        cancellationReason: "Changed my mind",
        paymentMethod: "cash",
        specialInstructions: ""
      }
    ];
    setUserOrders(sampleUserOrders);
  }, []);

  // Filter orders based on status and search term
  const filteredOrders = userOrders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#28a745';
      case 'preparing': return '#ffc107';
      case 'pending': return '#17a2b8';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✅';
      case 'preparing': return '👨‍🍳';
      case 'pending': return '⏳';
      case 'cancelled': return '❌';
      default: return '📋';
    }
  };

  // Calculate total spent
  const totalSpent = userOrders
    .filter(order => order.status === 'completed')
    .reduce((sum, order) => sum + parseInt(order.totalAmount.replace('Rs. ', '')), 0);

  // Get orders count by status
  const getOrdersCount = (status) => {
    return userOrders.filter(order => order.status === status).length;
  };

  return (
    <div className="orders-container">
      {/* Header */}
      <div className="orders-header">
        <h1>📋 My Orders</h1>
        <p>Welcome back, {currentUser.name}! Here are your order history</p>
      </div>

      {/* User Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Total Orders</h3>
            <p className="stat-number">{userOrders.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Total Spent</h3>
                         <p className="stat-number">Rs. {totalSpent}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>Completed</h3>
            <p className="stat-number">{getOrdersCount('completed')}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>Active Orders</h3>
            <p className="stat-number">{getOrdersCount('pending') + getOrdersCount('preparing')}</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by order number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        <div className="status-filters">
          <button 
            className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            All Orders
          </button>
          <button 
            className={`filter-btn ${filterStatus === 'pending' ? 'active' : ''}`}
            onClick={() => setFilterStatus('pending')}
          >
            Pending
          </button>
          <button 
            className={`filter-btn ${filterStatus === 'preparing' ? 'active' : ''}`}
            onClick={() => setFilterStatus('preparing')}
          >
            Preparing
          </button>
          <button 
            className={`filter-btn ${filterStatus === 'completed' ? 'active' : ''}`}
            onClick={() => setFilterStatus('completed')}
          >
            Completed
          </button>
          <button 
            className={`filter-btn ${filterStatus === 'cancelled' ? 'active' : ''}`}
            onClick={() => setFilterStatus('cancelled')}
          >
            Cancelled
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="orders-content">
        <div className="orders-list">
          <h2>Your Order History</h2>
          {filteredOrders.length === 0 ? (
            <div className="no-orders">
              <p>No orders found matching your criteria</p>
            </div>
          ) : (
            <div className="orders-grid">
              {filteredOrders.map(order => (
                <div 
                  key={order.id} 
                  className={`order-card ${selectedOrder?.id === order.id ? 'selected' : ''}`}
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="order-header">
                    <div className="order-number">{order.orderNumber}</div>
                    <div 
                      className="order-status"
                      style={{ color: getStatusColor(order.status) }}
                    >
                      {getStatusIcon(order.status)} {order.status}
                    </div>
                  </div>
                  <div className="order-items">
                    {order.items.slice(0, 2).map((item, index) => (
                      <span key={index} className="order-item">
                        {item.quantity}x {item.name}
                      </span>
                    ))}
                    {order.items.length > 2 && (
                      <span className="more-items">+{order.items.length - 2} more</span>
                    )}
                  </div>
                  <div className="order-footer">
                    <div className="order-time">{order.orderTime}</div>
                    <div className="order-total">{order.totalAmount}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Details */}
        {selectedOrder && (
          <div className="order-details">
            <div className="details-header">
              <h3>Order Details</h3>
              <button 
                className="close-details"
                onClick={() => setSelectedOrder(null)}
              >
                ✕
              </button>
            </div>
            
            <div className="details-content">
              <div className="detail-section">
                <h4>Order Information</h4>
                <div className="detail-row">
                  <span className="detail-label">Order Number:</span>
                  <span className="detail-value">{selectedOrder.orderNumber}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Order Time:</span>
                  <span className="detail-value">{selectedOrder.orderTime}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Payment Method:</span>
                  <span className="detail-value">
                    {selectedOrder.paymentMethod === 'card' ? '💳 Card' : '💵 Cash'}
                  </span>
                </div>
              </div>

              <div className="detail-section">
                <h4>Order Items</h4>
                <div className="items-list">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="item-row">
                      <div className="item-info">
                        <span className="item-name">{item.name}</span>
                        <span className="item-quantity">x{item.quantity}</span>
                      </div>
                      <span className="item-price">{item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="total-row">
                  <strong>Total Amount:</strong>
                  <strong className="total-amount">{selectedOrder.totalAmount}</strong>
                </div>
              </div>

              {selectedOrder.specialInstructions && (
                <div className="detail-section">
                  <h4>Special Instructions</h4>
                  <p className="special-instructions">{selectedOrder.specialInstructions}</p>
                </div>
              )}

              <div className="detail-section">
                <h4>Order Status</h4>
                <div className="status-info">
                  <div className="current-status">
                    <span className="status-label">Current Status:</span>
                    <span 
                      className="status-value"
                      style={{ color: getStatusColor(selectedOrder.status) }}
                    >
                      {getStatusIcon(selectedOrder.status)} {selectedOrder.status}
                    </span>
                  </div>
                  
                  {selectedOrder.status === 'preparing' && selectedOrder.estimatedTime && (
                    <div className="estimated-time">
                      Estimated completion: {selectedOrder.estimatedTime}
                    </div>
                  )}
                  
                  {selectedOrder.status === 'completed' && selectedOrder.completionTime && (
                    <div className="completion-time">
                      Completed at: {selectedOrder.completionTime}
                    </div>
                  )}
                  
                  {selectedOrder.status === 'cancelled' && selectedOrder.cancellationReason && (
                    <div className="cancellation-reason">
                      Reason: {selectedOrder.cancellationReason}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
