import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowRight, Briefcase, Users, ClipboardCheck, Activity } from 'lucide-react';
import api from '../../services/api';
import { getUserId } from '../../utils/auth';

export default function EmployerHome() {
  const [employerName, setEmployerName] = useState('SkillAlign AI');

  useEffect(() => {
    const userId = getUserId();
    if (userId) {
      api.get(`/employers/${userId}/dashboard`)
        .then(res => {
          if (res.data && res.data.employer_name) {
            setEmployerName(res.data.employer_name);
          }
        })
        .catch(err => console.error(err));
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 mb-2 flex items-center gap-3">
              <Building2 className="text-blue-600" size={32} />
              Welcome, {employerName}
            </h1>
            <p className="text-slate-500 text-lg">Employer Portal</p>
          </div>
          <div className="text-left md:text-right flex items-center gap-6">
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Organization</p>
              <p className="font-bold text-slate-700">{employerName}</p>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Role</p>
              <p className="text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-lg">Employer</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm font-bold text-slate-500 uppercase">Active Jobs</p>
          <p className="text-2xl font-black text-slate-800 mt-1">12</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm font-bold text-slate-500 uppercase">Applications</p>
          <p className="text-2xl font-black text-slate-800 mt-1">145</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm font-bold text-slate-500 uppercase">Top Matches</p>
          <p className="text-2xl font-black text-slate-800 mt-1">34</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm font-bold text-slate-500 uppercase">Pending Feedback</p>
          <p className="text-2xl font-black text-amber-600 mt-1">2</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="flex items-center gap-3 text-left p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors"><Briefcase size={20} /></div>
                <div>
                  <h3 className="font-bold text-slate-700 group-hover:text-blue-700">Post a Job</h3>
                  <p className="text-xs text-slate-500">Publish a new job requirement</p>
                </div>
              </button>
              <button className="flex items-center gap-3 text-left p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors"><Users size={20} /></div>
                <div>
                  <h3 className="font-bold text-slate-700 group-hover:text-blue-700">View Candidates</h3>
                  <p className="text-xs text-slate-500">Review AI-matched candidates</p>
                </div>
              </button>
              <button className="flex items-center gap-3 text-left p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors"><Activity size={20} /></div>
                <div>
                  <h3 className="font-bold text-slate-700 group-hover:text-blue-700">Complete Survey</h3>
                  <p className="text-xs text-slate-500">Share your workforce needs</p>
                </div>
              </button>
              <button className="flex items-center gap-3 text-left p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors"><ClipboardCheck size={20} /></div>
                <div>
                  <h3 className="font-bold text-slate-700 group-hover:text-blue-700">Curriculum Feedback</h3>
                  <p className="text-xs text-slate-500">Review training modules</p>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-blue-900 p-8 rounded-2xl shadow-sm text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Employer Dashboard</h2>
              <p className="text-blue-200">Access your complete hiring metrics, detailed job analytics, and applicant tracking.</p>
            </div>
            <Link to="/employer/dashboard" className="shrink-0 bg-white text-blue-900 hover:bg-slate-100 font-bold py-3 px-8 rounded-xl transition-all shadow-lg flex items-center gap-2">
              Open Dashboard <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-slate-300 shrink-0"></div>
                <div>
                  <p className="text-sm text-slate-700"><span className="font-bold">25 New Candidates</span> matched your Frontend Developer role.</p>
                  <p className="text-xs text-slate-400 mt-0.5">Just now</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-slate-300 shrink-0"></div>
                <div>
                  <p className="text-sm text-slate-700">Your curriculum feedback on "Advanced React" was accepted.</p>
                  <p className="text-xs text-slate-400 mt-0.5">Yesterday</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
