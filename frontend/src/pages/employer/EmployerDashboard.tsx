import { useEffect, useState } from 'react';
import { Building2, Briefcase, Users, TrendingUp, Plus, BarChart2 } from 'lucide-react';
import api from '../../services/api';

import { getUserId } from '../../utils/auth';

export default function EmployerDashboard() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Get dynamic user ID from JWT token
  const employerId = getUserId();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get(`/employers/${employerId}/dashboard`);
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching employer dashboard", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Building2 className="text-indigo-600" /> {dashboardData?.employer_name} Portal
          </h1>
          <p className="text-slate-500 text-sm mt-1">Manage job postings, review applicants, and track {dashboardData?.industry} industry trends.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Plus size={16} />
            Post New Job
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-4 bg-indigo-50 rounded-lg text-indigo-600">
            <Briefcase size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Active Jobs</p>
            <p className="text-3xl font-black text-slate-800">{dashboardData?.active_jobs_count || 0}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-4 bg-emerald-50 rounded-lg text-emerald-600">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Hires</p>
            <p className="text-3xl font-black text-slate-800">{dashboardData?.total_placements || 0}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-4 bg-amber-50 rounded-lg text-amber-600">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Industry Trend</p>
            <p className="text-lg font-bold text-emerald-600">{dashboardData?.industry_trend}</p>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Jobs */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800">Recent Job Postings</h2>
            <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">View All</button>
          </div>
          <div className="divide-y divide-slate-100">
            {dashboardData?.recent_jobs?.map((job: any) => (
              <div key={job.id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-800 text-lg">{job.title}</h3>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">ACTIVE</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {job.skills.map((skill: string, idx: number) => (
                    <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Future Skills Survey */}
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-xl shadow-sm border border-indigo-800 p-6 text-white flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-300 mb-4">
              <BarChart2 size={24} />
            </div>
            <h2 className="text-xl font-bold mb-2">Help Shape the Future</h2>
            <p className="text-indigo-200 text-sm leading-relaxed mb-6">
              The government relies on employer feedback to fund new training programs. Tell us what skills you will need in the next 12-24 months.
            </p>
          </div>
          <button className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-bold transition-colors">
            Take Skills Survey
          </button>
        </div>

      </div>
    </div>
  );
}
