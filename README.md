# CryberKnights

# 🍴 CANTEC MIS – Smart Canteen Management & Information System

CANTEC MIS (Canteen Management & Information System) is a **technology-driven solution** designed to streamline university canteen operations.  
It reduces waiting times, enables cashless payments, optimizes inventory, and enhances the overall dining experience for students, staff, and administrators.  

---

## 📖 Project Overview

The Faculty of Technology’s canteen plays a vital role in campus life, but inefficiencies such as **long queues, manual orders, cash-only payments, and lack of analytics** affect service quality.  

CANTEC MIS introduces a **digital canteen platform** that integrates:
- Online ordering & tokenized queues  
- Cashless payments  
- Real-time menu & inventory updates  
- Admin dashboards with analytics  
- Chatbot support for students  

---

## ✨ Key Features

- 📱 **Online Ordering & Pre-Booking** – Students can pre-order meals via web app  
- 🍴 **Segmented Queue System** – Dedicated counters (Pre-order Pickup, Meal Orders, Snacks)  
- ⏳ **Token-Based Waiting** – Digital tokens with push & SMS notifications (10–15 min prep window)  
- 💳 **Cashless Payments** – Integrated payment gateway with card/mobile wallet support  
- 📊 **Dashboards** –  
  - **Canteen Dashboard**: Staff can manage token queues  
  - **Admin Dashboard**: Analytics for sales, peak hours, and inventory  
- 🤖 **Chatbot Integration** – Dialogflow-powered chatbot for complaints, FAQs, and order tracking  
- 📈 **Analytics & Reports** – Forecast demand, manage staff, and reduce food wastage  

---

## 🛠️ Tech Stack

| Layer         | Technology                   |
|---------------|------------------------------|
| Frontend      | React.js, CSS                |
| Backend       | Node.js (Express)            |  
| Database      | MongoDB                      |
| Chatbot       | Dialogflow                   |
| Notifications | Push Notifications + SMS API |
| Hosting       | AWS Cloud                    |

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   
   ```bash
   git clone https://github.com/your-username/cantec-mis.git
   cd cantec-mis

2. **Install dependencies**

   ```bash
   # Install backend dependencies
   cd backend
    npm install
    # Install frontend dependencies
    cd ../frontend
    npm install

3. **Environment Variables**
   Create a .env file in both backend & frontend with:

   ```env
   MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    PAYMENT_API_KEY=your_payment_gateway_key
    SMS_API_KEY=your_sms_gateway_key

4. **Run the project**

   ```bash
   # Start backend
    cd backend
    npm run dev

    # Start frontend
   cd ../frontend
    npm start

5. **Access the app**

   - Frontend → http://localhost:3000
   - Backend API → http://localhost:5000


## 🤝 Contributing
We welcome contributions from students, developers, and researchers!
1. **Fork the project**
2. **Create your feature branch**
   
   ```bash
   git checkout -b feature/YourFeature
   
3. **Commit your changes**

   ```bash
   git commit -m "Add your feature"

4. **Push to the branch**

   ```bash
   git push origin feature/YourFeature

5. **Create a Pull Request**

## 📌 Future Enhancements

- AI-based demand prediction for inventory
- WhatsApp/Telegram chatbot ordering
- Face recognition payments linked to student ID
- Nutrition tracking for healthier meal options



Don't forget to hit the :star: if you like this repo.
