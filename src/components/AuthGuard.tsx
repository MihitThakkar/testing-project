import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, requireAuth = true }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const authenticated = isAuthenticated();
    
    if (requireAuth && !authenticated) {
      navigate('/login');
    } else if (!requireAuth && authenticated) {
      navigate('/');
    }
  }, [navigate, requireAuth]);

  return <>{children}</>;
}

export default AuthGuard;