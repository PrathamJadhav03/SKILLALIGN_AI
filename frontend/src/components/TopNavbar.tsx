import { Menu, Search, Bell, HelpCircle, User, ChevronDown, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { decodeToken } from '../utils/auth';
interface TopNavbarProps {
  toggleSidebar: () => void;
}

export default function TopNavbar({ toggleSidebar }: TopNavbarProps) {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  
  const token = localStorage.getItem('token');
  let userEmail = 'user@example.com';
  let userRoleName = 'User Role';
  let initial = 'U';

  if (token) {
    const decoded = decodeToken(token);
    if (decoded) {
      userEmail = decoded.sub;
      initial = userEmail.charAt(0).toUpperCase();
      switch(decoded.role_id) {
        case 1: userRoleName = 'Government Authority'; break;
        case 2: userRoleName = 'Employer'; break;
        case 3: userRoleName = 'Training Institute'; break;
        case 4: userRoleName = 'Candidate'; break;
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        switch(decoded.role_id) {
          case 1: navigate('/government'); return;
          case 2: navigate('/employer'); return;
          case 3: navigate('/institute'); return;
          case 4: navigate('/candidate'); return;
        }
      }
    }
    navigate('/');
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-10 sticky top-0 shrink-0 shadow-sm">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
        >
          <Menu size={20} />
        </button>

        {/* Global Search */}
        <div className="hidden md:flex items-center max-w-md w-full relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search jobs, skills, candidates, districts..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-sm transition-colors"
            onChange={(e) => setShowSearchDropdown(e.target.value.length > 0)}
            onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
          />
          {showSearchDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-xl py-2 z-50">
              <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Quick Results</div>
              <button className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2">
                <Search size={14} className="text-slate-400" /> <span className="text-sm font-medium text-slate-700">"Data Analytics" in Skills</span>
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2">
                <Search size={14} className="text-slate-400" /> <span className="text-sm font-medium text-slate-700">"Pune" in Districts</span>
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2 border-t border-slate-100 mt-1">
                <span className="text-xs font-bold text-indigo-600">View all 24 results</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Help */}
        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors hidden sm:block">
          <HelpCircle size={20} />
        </button>

        {/* Notifications */}
        <button onClick={() => navigate('/notifications')} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
        </button>

        <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div>

        {/* User Profile */}
        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm">
              {initial}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-bold text-slate-700 leading-none truncate max-w-[120px]">{userEmail.split('@')[0]}</p>
              <p className="text-xs text-slate-500 mt-1 leading-none">{userRoleName}</p>
            </div>
            <ChevronDown size={16} className="text-slate-400 hidden sm:block" />
          </button>

          {/* Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50">
              <div className="px-4 py-2 border-b border-slate-100 mb-1">
                <p className="text-sm font-bold text-slate-700 truncate">{userEmail}</p>
                <p className="text-xs text-slate-500">{userRoleName}</p>
              </div>
              <button 
                onClick={() => {
                  setShowProfileMenu(false);
                  navigate('/settings');
                }}
                className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2"
              >
                <User size={16} /> Profile Settings
              </button>
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <LogOut size={16} /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
