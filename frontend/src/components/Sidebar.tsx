import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  BookOpen, 
  Users, 
  Award, 
  TrendingUp, 
  Map, 
  Settings, 
  FileText,
  Search,
  Building,
  Bell,
  Home,
  MessageSquare,
  ClipboardCheck,
  CheckCircle,
  Activity,
  Wrench
} from 'lucide-react';
import { getUserRole } from '../utils/auth';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();
  const roleId = getUserRole(); // 1: Govt, 2: Employer, 3: Institute, 4: Candidate

  const allSections = [
    // GOVERNMENT (role 1)
    {
      title: 'HOME & DASHBOARD',
      roles: [1],
      items: [
        { name: 'Home', path: '/government/home', icon: Home },
        { name: 'Dashboard', path: '/government/dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: 'LABOUR INTELLIGENCE',
      roles: [1],
      items: [
        { name: 'Labour Market', path: '#', icon: Activity },
        { name: 'Job Demand', path: '/jobs', icon: Briefcase },
        { name: 'Skills & Trends', path: '/skills', icon: TrendingUp },
      ]
    },
    {
      title: 'TRAINING ECOSYSTEM',
      roles: [1],
      items: [
        { name: 'Training Institutes', path: '#', icon: Building },
        { name: 'Courses', path: '/courses', icon: BookOpen },
        { name: 'Trainers', path: '#', icon: Users },
      ]
    },
    {
      title: 'PLANNING & REPORTS',
      roles: [1],
      items: [
        { name: 'District Planning', path: '/districts', icon: Map },
        { name: 'Reports', path: '/reports', icon: FileText }
      ]
    },
    
    // EMPLOYER (role 2)
    {
      title: 'HOME & DASHBOARD',
      roles: [2],
      items: [
        { name: 'Home', path: '/employer/home', icon: Home },
        { name: 'Dashboard', path: '/employer/dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: 'JOBS',
      roles: [2],
      items: [
        { name: 'My Jobs', path: '#', icon: Briefcase },
        { name: 'Post Job', path: '#', icon: PlusSquareIcon },
        { name: 'Applications', path: '#', icon: FileText }
      ]
    },
    {
      title: 'CANDIDATES',
      roles: [2],
      items: [
        { name: 'Candidate Search', path: '#', icon: Search },
        { name: 'Matches', path: '#', icon: CheckCircle }
      ]
    },
    {
      title: 'EMPLOYER INTELLIGENCE',
      roles: [2],
      items: [
        { name: 'Surveys', path: '/employer/surveys', icon: MessageSquare },
        { name: 'Curriculum Feedback', path: '#', icon: ClipboardCheck }
      ]
    },

    // INSTITUTE (role 3)
    {
      title: 'HOME & DASHBOARD',
      roles: [3],
      items: [
        { name: 'Home', path: '/institute/home', icon: Home },
        { name: 'Dashboard', path: '/institute/dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: 'COURSES',
      roles: [3],
      items: [
        { name: 'All Courses', path: '/courses', icon: BookOpen },
      ]
    },
    {
      title: 'TRAINERS & EQUIPMENT',
      roles: [3],
      items: [
        { name: 'Trainers', path: '#', icon: Users },
        { name: 'Equipment', path: '#', icon: Wrench },
      ]
    },

    // CANDIDATE (role 4)
    {
      title: 'HOME & DASHBOARD',
      roles: [4],
      items: [
        { name: 'Home', path: '/candidate/home', icon: Home },
        { name: 'Dashboard', path: '/candidate/profile', icon: LayoutDashboard },
      ]
    },
    {
      title: 'MY SKILLS',
      roles: [4],
      items: [
        { name: 'Assessment', path: '/candidate/assessments', icon: Award },
        { name: 'Skill Gap', path: '/candidate/profile#skill-gap', icon: TrendingUp }
      ]
    },
    {
      title: 'LEARNING',
      roles: [4],
      items: [
        { name: 'Recommended Courses', path: '/candidate/profile#recommended-courses', icon: BookOpen },
      ]
    },
    {
      title: 'JOBS',
      roles: [4],
      items: [
        { name: 'Recommended Jobs', path: '/candidate/jobs', icon: Search },
      ]
    },
    
    // COMMON SYSTEM SETTINGS (All roles)
    {
      title: 'SYSTEM',
      roles: [1, 2, 3, 4],
      items: [
        { name: 'Notifications', path: '/notifications', icon: Bell },
        { name: 'Settings', path: '/settings', icon: Settings }
      ]
    }
  ];

  const sections = allSections.filter(section => roleId === 0 || section.roles.includes(roleId));

  return (
    <div 
      className={`${isOpen ? 'w-64' : 'w-20'} bg-slate-900 text-slate-300 transition-all duration-300 ease-in-out shrink-0 h-screen sticky top-0 overflow-y-auto flex flex-col z-20`}
    >
      <div className="h-16 flex items-center justify-center border-b border-slate-800 shrink-0 sticky top-0 bg-slate-900 z-10 px-4">
        {isOpen ? (
          <div className="flex items-center gap-3 w-full">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-xl text-white shrink-0">S</div>
            <span className="font-bold text-xl tracking-tight text-white whitespace-nowrap">SkillAlign<span className="text-indigo-400">AI</span></span>
          </div>
        ) : (
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-xl text-white shrink-0">S</div>
        )}
      </div>

      <div className="py-6 flex-1">
        {sections.map((section, idx) => (
          <div key={idx} className="mb-6">
            {isOpen && (
              <h3 className="px-6 mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                {section.title}
              </h3>
            )}
            <ul className="space-y-1 px-3">
              {section.items.map((item) => {
                const Icon = item.icon;
                const basePath = item.path.split('#')[0];
                const isActive = location.pathname === basePath;
                
                return (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={`flex items-center ${isOpen ? 'gap-3 px-3' : 'justify-center'} py-2 rounded-lg transition-colors group relative ${
                        isActive && basePath !== '#'
                          ? 'bg-indigo-600 text-white' 
                          : 'hover:bg-slate-800 hover:text-white text-slate-400'
                      }`}
                      title={!isOpen ? item.name : undefined}
                    >
                      <Icon size={20} className={(isActive && basePath !== '#') ? 'text-white' : 'text-slate-400 group-hover:text-white transition-colors'} />
                      {isOpen && <span className="text-sm font-medium whitespace-nowrap">{item.name}</span>}
                      
                      {/* Tooltip for collapsed state */}
                      {!isOpen && (
                        <div className="absolute left-14 bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-lg">
                          {item.name}
                        </div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// Small helper for a missing icon
function PlusSquareIcon({ size, className }: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="12" x2="12" y1="8" y2="16"/><line x1="8" x2="16" y1="12" y2="12"/>
    </svg>
  );
}
