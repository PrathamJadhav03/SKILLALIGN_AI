import { Link } from 'react-router-dom';
import { Users, ArrowRight, UserCheck, TrendingUp, BookOpen, Briefcase } from 'lucide-react';

export default function CandidateHome() {
  return (
    <div className="max-w-4xl mx-auto space-y-4 md:space-y-6 px-2 md:px-0 pb-8">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-2">
          <Users className="text-amber-500" size={28} />
          <h1 className="text-2xl md:text-3xl font-black text-slate-800">
            Welcome back, Candidate!
          </h1>
        </div>
        <p className="text-slate-500 text-base md:text-lg">Your Personal Career Workspace</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <p className="text-xs md:text-sm font-bold text-slate-500 uppercase">Profile</p>
          <p className="text-xl md:text-2xl font-black text-slate-800 mt-1">85%</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <p className="text-xs md:text-sm font-bold text-slate-500 uppercase">Matching Jobs</p>
          <p className="text-xl md:text-2xl font-black text-slate-800 mt-1">12</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <p className="text-xs md:text-sm font-bold text-slate-500 uppercase">Applications</p>
          <p className="text-xl md:text-2xl font-black text-amber-600 mt-1">3</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <p className="text-xs md:text-sm font-bold text-slate-500 uppercase">Notifications</p>
          <p className="text-xl md:text-2xl font-black text-blue-600 mt-1">1</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-4 md:mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <button className="flex items-center gap-3 text-left p-4 rounded-xl border border-slate-200 hover:border-amber-300 hover:bg-amber-50 transition-colors group">
            <div className="bg-amber-100 text-amber-600 p-2 rounded-lg group-hover:bg-amber-500 group-hover:text-slate-900 transition-colors shrink-0"><UserCheck size={20} /></div>
            <div>
              <h3 className="font-bold text-slate-700 group-hover:text-amber-700">Complete Profile</h3>
              <p className="text-xs text-slate-500">Update your experience</p>
            </div>
          </button>
          <button className="flex items-center gap-3 text-left p-4 rounded-xl border border-slate-200 hover:border-amber-300 hover:bg-amber-50 transition-colors group">
            <div className="bg-amber-100 text-amber-600 p-2 rounded-lg group-hover:bg-amber-500 group-hover:text-slate-900 transition-colors shrink-0"><TrendingUp size={20} /></div>
            <div>
              <h3 className="font-bold text-slate-700 group-hover:text-amber-700">Take Assessment</h3>
              <p className="text-xs text-slate-500">Verify your technical skills</p>
            </div>
          </button>
          <button className="flex items-center gap-3 text-left p-4 rounded-xl border border-slate-200 hover:border-amber-300 hover:bg-amber-50 transition-colors group">
            <div className="bg-amber-100 text-amber-600 p-2 rounded-lg group-hover:bg-amber-500 group-hover:text-slate-900 transition-colors shrink-0"><BookOpen size={20} /></div>
            <div>
              <h3 className="font-bold text-slate-700 group-hover:text-amber-700">Find Courses</h3>
              <p className="text-xs text-slate-500">Bridge your skill gap</p>
            </div>
          </button>
          <button className="flex items-center gap-3 text-left p-4 rounded-xl border border-slate-200 hover:border-amber-300 hover:bg-amber-50 transition-colors group">
            <div className="bg-amber-100 text-amber-600 p-2 rounded-lg group-hover:bg-amber-500 group-hover:text-slate-900 transition-colors shrink-0"><Briefcase size={20} /></div>
            <div>
              <h3 className="font-bold text-slate-700 group-hover:text-amber-700">Find Jobs</h3>
              <p className="text-xs text-slate-500">View AI-matched roles</p>
            </div>
          </button>
        </div>
      </div>

      <div className="bg-amber-500 p-6 md:p-8 rounded-2xl shadow-sm text-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">Candidate Dashboard</h2>
          <p className="text-amber-900 text-sm md:text-base font-medium">Access your comprehensive profile, job recommendations, and assessments.</p>
        </div>
        <Link to="/candidate/profile" className="w-full md:w-auto text-center shrink-0 bg-slate-900 text-white hover:bg-slate-800 font-bold py-3 px-8 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
          Open Dashboard <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}
