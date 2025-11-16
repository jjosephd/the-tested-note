// src/components/auth/LogoutButton.tsx
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-sm text-red-600 hover:text-red-800"
    >
      Logout
    </button>
  );
};