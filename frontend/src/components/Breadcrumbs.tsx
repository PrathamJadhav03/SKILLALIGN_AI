import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

import { getUserRole } from '../utils/auth';

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const roleId = getUserRole();
  
  let homeRoute = '/candidate/home';
  if (roleId === 1) homeRoute = '/government/home';
  else if (roleId === 2) homeRoute = '/employer/home';
  else if (roleId === 3) homeRoute = '/institute/home';

  // Map of path segments to readable names (could be expanded)
  const breadcrumbNameMap: Record<string, string> = {
    'government': 'Government Portal',
    'dashboard': 'Dashboard',
    'institute': 'Training Institute',
    'candidate': 'Candidate Portal',
    'profile': 'Profile',
    'assessments': 'Assessments',
    'jobs': 'Jobs',
    'skills': 'Skills Intelligence',
    'courses': 'Courses',
    'reports': 'Reports',
    'districts': 'District Planning',
    'employer': 'Employer Portal',
    'surveys': 'Surveys',
    'notifications': 'Notifications',
    'settings': 'Settings',
    'welcome': 'Welcome'
  };

  return (
    <nav className="flex items-center text-sm font-medium text-slate-500 mb-6">
      <Link to={homeRoute} className="hover:text-indigo-600 transition-colors flex items-center gap-1">
        <Home size={14} />
      </Link>
      
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const name = breadcrumbNameMap[value] || value.charAt(0).toUpperCase() + value.slice(1);

        return (
          <div key={to} className="flex items-center">
            <ChevronRight size={14} className="mx-2 text-slate-400" />
            {last ? (
              <span className="text-slate-800 font-bold" aria-current="page">
                {name}
              </span>
            ) : (
              <Link to={to} className="hover:text-indigo-600 transition-colors">
                {name}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
