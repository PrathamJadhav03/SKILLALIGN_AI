import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function ProtectedRoute() {
  const token = localStorage.getItem('token');
  const location = useLocation();
  
  if (!token) {
    // Infer the correct login portal from the attempted path
    const path = location.pathname;
    let loginPath = '/candidate/login'; // Fallback
    
    if (path.startsWith('/government')) loginPath = '/government/login';
    else if (path.startsWith('/employer')) loginPath = '/employer/login';
    else if (path.startsWith('/institute')) loginPath = '/institute/login';
    else if (path.startsWith('/candidate')) loginPath = '/candidate/login';
    
    return <Navigate to={loginPath} replace />;
  }

  // If token exists, allow access to the protected child routes
  return <Outlet />;
}
