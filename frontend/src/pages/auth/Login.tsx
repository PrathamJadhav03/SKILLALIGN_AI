import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Mail, Lock, Shield, Building2, Building, Users } from 'lucide-react';
import api from '../../services/api';

interface LoginProps {
  portalType: 'government' | 'employer' | 'institute' | 'candidate';
}

export default function Login({ portalType }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.message;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);
      
      const res = await api.post('/auth/login', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      const token = res.data.access_token;
      localStorage.setItem('token', token);
      
      const { decodeToken } = await import('../../utils/auth');
      const decoded = decodeToken(token);
      const roleId = decoded?.role_id;

      // Redirect to the Authenticated Home page of the respective portal
      // Note: We could do a strict check here, e.g. if portalType === 'candidate' but roleId !== 4, show error.
      // For now, we trust the routing or simply redirect to their actual role home.
      
      if (roleId === 1) navigate('/government/home');
      else if (roleId === 2) navigate('/employer/home');
      else if (roleId === 3) navigate('/institute/home');
      else if (roleId === 4) navigate('/candidate/home');
      else navigate(`/${portalType}/home`);
      
    } catch (err) {
      alert('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const getPortalContent = () => {
    switch (portalType) {
      case 'government':
        return {
          title: 'Government Login',
          subtitle: 'Secure access to government labour-market intelligence and skill planning.',
          icon: <Shield className="text-white" size={32} />,
          color: 'bg-indigo-600',
          hoverColor: 'hover:bg-indigo-700',
          textColor: 'text-indigo-600'
        };
      case 'employer':
        return {
          title: 'Employer Login',
          subtitle: 'Access employer workforce intelligence and candidate matching.',
          icon: <Building2 className="text-white" size={32} />,
          color: 'bg-blue-600',
          hoverColor: 'hover:bg-blue-700',
          textColor: 'text-blue-600'
        };
      case 'institute':
        return {
          title: 'Institute Login',
          subtitle: 'Manage courses, curriculum, trainers and training capacity.',
          icon: <Building className="text-white" size={32} />,
          color: 'bg-emerald-600',
          hoverColor: 'hover:bg-emerald-700',
          textColor: 'text-emerald-600'
        };
      case 'candidate':
      default:
        return {
          title: 'Candidate Login',
          subtitle: 'Access your skills, assessments, courses and job opportunities.',
          icon: <Users className="text-slate-900" size={32} />,
          color: 'bg-amber-500',
          hoverColor: 'hover:bg-amber-600',
          textColor: 'text-amber-600',
          titleColor: 'text-slate-900',
          subtitleColor: 'text-slate-800',
          iconBg: 'bg-slate-900/10'
        };
    }
  };

  const content = getPortalContent();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-100">
        <div className={`${content.color} p-8 text-center`}>
          <div className={`w-16 h-16 ${content.iconBg || 'bg-white/20'} rounded-2xl mx-auto flex items-center justify-center mb-4`}>
            {content.icon}
          </div>
          <h1 className={`text-2xl font-bold ${content.titleColor || 'text-white'}`}>{content.title}</h1>
          <p className={`${content.subtitleColor || 'text-white/80'} mt-2 text-sm`}>{content.subtitle}</p>
        </div>
        
        <div className="p-8">
          {successMessage && (
            <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg text-sm font-medium">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${content.color} ${content.hoverColor} ${content.titleColor || 'text-white'} font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2`}
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className={`${content.textColor} font-bold hover:underline`}>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
