import { Navigate } from 'react-router-dom';
import * as jwt_decode from 'jwt-decode';

const StaffRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwt_decode.jwtDecode(token);
    if (decoded.role !== 'staff') {
      return <Navigate to="/" replace />;
    }
    return children;
  } catch (error) {
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }
};

export default StaffRoute;
