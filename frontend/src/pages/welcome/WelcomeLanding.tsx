import { Link } from 'react-router-dom';
import { Shield, Building2, Building, Users, ArrowRight } from 'lucide-react';
import { getUserRole } from '../../utils/auth';

export default function WelcomeLanding() {
  const roleId = getUserRole(); // 1: Govt, 2: Employer, 3: Institute, 4: Candidate

  let content = {
    title: '',
    description: '',
    features: [] as string[],
    dashboardLink: '',
    icon: <Shield size={64} className="text-indigo-500" />
  };

  switch (roleId) {
    case 1:
      content = {
        title: 'Welcome to the Government Portal',
        description: 'You are logged in as a Government Authority. This platform provides statewide labour intelligence and workforce planning tools.',
        features: [
          'Monitor active job demands across districts',
          'Analyze emerging skill requirements',
          'Review placement outcomes of training institutes',
          'Optimize budget allocation based on AI insights'
        ],
        dashboardLink: '/government/dashboard',
        icon: <Shield size={64} className="text-indigo-500" />
      };
      break;
    case 2:
      content = {
        title: 'Welcome to the Employer Portal',
        description: 'You are logged in as an Employer. Engage with the workforce ecosystem by identifying required skills and hiring top talent.',
        features: [
          'Post job openings and attract skilled candidates',
          'Provide feedback on future skill demands',
          'Participate in government skill surveys',
          'Discover AI-matched candidates'
        ],
        dashboardLink: '/employer/dashboard',
        icon: <Building2 size={64} className="text-indigo-500" />
      };
      break;
    case 3:
      content = {
        title: 'Welcome to the Institute Portal',
        description: 'You are logged in as a Training Institute. Create and align your curriculums directly with regional industry demand.',
        features: [
          'Manage your active courses and curriculum',
          'Track student enrollment and placement rates',
          'Receive AI recommendations for new in-demand courses',
          'Bridge the gap between education and employment'
        ],
        dashboardLink: '/institute/dashboard',
        icon: <Building size={64} className="text-indigo-500" />
      };
      break;
    case 4:
    default:
      content = {
        title: 'Welcome to the Candidate Portal',
        description: 'You are logged in as a Candidate. Accelerate your career by matching your skills with the right opportunities.',
        features: [
          'Build your verified skills profile',
          'Discover highly accurate AI job matches',
          'Take courses to bridge your skill gaps',
          'Take assessments to verify your expertise'
        ],
        dashboardLink: '/candidate/profile',
        icon: <Users size={64} className="text-indigo-500" />
      };
      break;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-10 max-w-2xl w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-indigo-50 rounded-full">
            {content.icon}
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-slate-800 mb-4">{content.title}</h1>
        <p className="text-slate-600 text-lg mb-8 leading-relaxed">
          {content.description}
        </p>

        <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 text-left mb-8">
          <h3 className="font-bold text-slate-700 mb-4 uppercase tracking-wider text-sm">Key Capabilities</h3>
          <ul className="space-y-3">
            {content.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3 text-slate-600">
                <div className="mt-1 w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link 
          to={content.dashboardLink} 
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-all hover:scale-105 hover:shadow-md"
        >
          Go to Dashboard
          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}
