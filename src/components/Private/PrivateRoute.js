import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  useEffect(() => {
    if (!role) {
      navigate('/');
    }
  }, [role, navigate]);

  return role ? children : null;
};

export default PrivateRoute;