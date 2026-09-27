import { Link } from 'react-router-dom';
import { Building, ArrowRight, BookOpen, Users, AlertTriangle, Briefcase, Plus } from 'lucide-react';

export default function InstituteHome() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 mb-2 flex items-center gap-3">
              <Building className="text-emerald-600" size={32} />
              Welcome to SkillAlign AI
            </h1>
            <p className="text-slate-500 text-lg">Training Institute Portal</p>
          </div>
          <div className="text-left md:text-right flex items-center gap-6">
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Role</p>
              <p className="text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-lg">Training Institute</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm font-bold text-slate-500 uppercase">Active Courses</p>
          <p className="text-2xl font-black text-slate-800 mt-1">8</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm font-bold text-slate-500 uppercase">Current Learners</p>
          <p className="text-2xl font-black text-slate-800 mt-1">452</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm font-bold text-slate-500 uppercase">Placement Rate</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">76%</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm font-bold text-slate-500 uppercase">Curriculum Alerts</p>
          <p className="text-2xl font-black text-amber-600 mt-1">1</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="flex items-center gap-3 text-left p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors group">
                <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors"><Plus size={20} /></div>
                <div>
                  <h3 className="font-bold text-slate-700 group-hover:text-emerald-700">Manage Courses</h3>
                  <p className="text-xs text-slate-500">Add or edit your courses</p>
                </div>
              </button>
              <button className="flex items-center gap-3 text-left p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors group">
                <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors"><BookOpen size={20} /></div>
                <div>
                  <h3 className="font-bold text-slate-700 group-hover:text-emerald-700">Review Curriculum</h3>
                  <p className="text-xs text-slate-500">Align with industry demands</p>
                </div>
              </button>
              <button className="flex items-center gap-3 text-left p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors group">
                <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors"><Users size={20} /></div>
                <div>
                  <h3 className="font-bold text-slate-700 group-hover:text-emerald-700">Manage Trainers</h3>
                  <p className="text-xs text-slate-500">Monitor trainer upskilling</p>
                </div>
              </button>
              <button className="flex items-center gap-3 text-left p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors group">
                <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors"><Briefcase size={20} /></div>
                <div>
                  <h3 className="font-bold text-slate-700 group-hover:text-emerald-700">View Placements</h3>
                  <p className="text-xs text-slate-500">Track graduate employment</p>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-emerald-900 p-8 rounded-2xl shadow-sm text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Institute Dashboard</h2>
              <p className="text-emerald-200">Access your complete course analytics, AI insights, and placement outcomes.</p>
            </div>
            <Link to="/institute/dashboard" className="shrink-0 bg-white text-emerald-900 hover:bg-slate-100 font-bold py-3 px-8 rounded-xl transition-all shadow-lg flex items-center gap-2">
              Open Dashboard <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="text-amber-500" />
              Action Required
            </h2>
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                <p className="text-sm font-bold text-amber-900">Curriculum Gap Detected</p>
                <p className="text-xs text-amber-700 mt-1">"Cloud Security" is missing from your Networking course despite high local demand.</p>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                <p className="text-sm font-bold text-amber-900">Equipment Shortage</p>
                <p className="text-xs text-amber-700 mt-1">Trainer workstation requirement for Lab B is not met.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
