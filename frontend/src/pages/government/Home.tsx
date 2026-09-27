import { Link } from 'react-router-dom';
import { Shield, ArrowRight, Bell, Activity, Target } from 'lucide-react';

export default function GovernmentHome() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-800 mb-2 flex items-center gap-3">
              <Shield className="text-indigo-600" size={32} />
              Welcome to SkillAlign AI
            </h1>
            <p className="text-slate-500 text-lg">Maharashtra Labour-Market Intelligence & Skill Planning Platform</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">User Role</p>
            <p className="text-indigo-600 font-bold bg-indigo-50 px-3 py-1 rounded-lg">Government Authority</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Target className="text-indigo-500" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="text-left p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors group">
                <h3 className="font-bold text-slate-700 group-hover:text-indigo-700 mb-1">View Labour Intelligence</h3>
                <p className="text-sm text-slate-500">Analyze current job demands and skill requirements</p>
              </button>
              <button className="text-left p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors group">
                <h3 className="font-bold text-slate-700 group-hover:text-indigo-700 mb-1">Review Curriculum</h3>
                <p className="text-sm text-slate-500">Analyze curriculum alignment across institutes</p>
              </button>
              <button className="text-left p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors group">
                <h3 className="font-bold text-slate-700 group-hover:text-indigo-700 mb-1">District Planning</h3>
                <p className="text-sm text-slate-500">Review training capacity at the district level</p>
              </button>
              <button className="text-left p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors group">
                <h3 className="font-bold text-slate-700 group-hover:text-indigo-700 mb-1">Generate Report</h3>
                <p className="text-sm text-slate-500">Export placement outcomes and statistics</p>
              </button>
            </div>
          </div>

          <div className="bg-indigo-900 p-8 rounded-2xl shadow-sm text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Government Dashboard</h2>
              <p className="text-indigo-200">Access your complete analytical workspace with live charts, KPIs, and statewide insights.</p>
            </div>
            <Link to="/government/dashboard" className="shrink-0 bg-white text-indigo-900 hover:bg-slate-100 font-bold py-3 px-8 rounded-xl transition-all shadow-lg flex items-center gap-2">
              Open Dashboard <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Bell className="text-amber-500" />
              Important Alerts
            </h2>
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                <p className="text-sm font-bold text-amber-900">Skill Shortage Alert</p>
                <p className="text-xs text-amber-700 mt-1">High demand for "Cloud Computing" in Pune district with low training capacity.</p>
              </div>
              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg">
                <p className="text-sm font-bold text-emerald-900">Placement Milestone</p>
                <p className="text-xs text-emerald-700 mt-1">Statewide placement rate exceeded 65% this quarter.</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Activity className="text-blue-500" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-slate-300 shrink-0"></div>
                <div>
                  <p className="text-sm text-slate-700">New employer survey submitted by <span className="font-bold">TechCorp Solutions</span></p>
                  <p className="text-xs text-slate-400 mt-0.5">2 hours ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-slate-300 shrink-0"></div>
                <div>
                  <p className="text-sm text-slate-700">New course "Advanced React" approved for <span className="font-bold">Mumbai Tech Institute</span></p>
                  <p className="text-xs text-slate-400 mt-0.5">5 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
