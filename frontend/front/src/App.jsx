import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import StaffRoute from './components/StaffRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Orders from './pages/Orders'
import Menu from './pages/Menu'
import Tokens from './pages/Tokens'
import Feedback from './pages/Feedback'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/orders" element={<StaffRoute><Orders /></StaffRoute>} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/tokens" element={<Tokens />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </main>
        <Footer />
      </div>
   
  )
}

export default App
