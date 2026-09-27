import { useEffect, useState } from 'react';
import { Building, BookOpen, Users, Award, Plus, Sparkles, TrendingUp, AlertCircle } from 'lucide-react';
import api from '../../services/api';

import { getUserId } from '../../utils/auth';

export default function InstituteDashboard() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Get dynamic user ID from JWT token
  const instituteId = getUserId();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get(`/institutes/${instituteId}/dashboard`);
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching institute dashboard", error);
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
            <Building className="text-indigo-600" /> {dashboardData?.institute_name} Portal
          </h1>
          <p className="text-slate-500 text-sm mt-1">{dashboardData?.type} • Manage courses, enrollments, and view AI curriculum recommendations.</p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Plus size={16} />
            Create Course
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-4 bg-indigo-50 rounded-lg text-indigo-600">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Active Courses</p>
            <p className="text-3xl font-black text-slate-800">{dashboardData?.total_courses}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-4 bg-emerald-50 rounded-lg text-emerald-600">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Enrolled</p>
            <p className="text-3xl font-black text-slate-800">{dashboardData?.total_students}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-4 bg-blue-50 rounded-lg text-blue-600">
            <Award size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Placement Rate</p>
            <p className="text-3xl font-black text-slate-800">{dashboardData?.placement_rate}%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Courses */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
            <h2 className="text-lg font-bold text-slate-800">Your Curriculum Directory</h2>
            <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">View All</button>
          </div>
          <div className="divide-y divide-slate-100">
            {dashboardData?.active_courses?.map((course: any) => (
              <div key={course.id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">{course.name}</h3>
                    <p className="text-sm text-slate-500 mt-1 flex items-center gap-4">
                      <span>Duration: {course.duration_weeks} weeks</span>
                      <span className="flex items-center gap-1 text-indigo-600 font-medium">
                        <Users size={14} /> {course.enrolled} Enrolled
                      </span>
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">ACTIVE</span>
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-xs uppercase font-bold text-slate-400 mb-2">Skills Taught</p>
                  <div className="flex flex-wrap gap-2">
                    {course.skills.map((skill: string, idx: number) => (
                      <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 rounded">
                        {skill}
                      </span>
                    ))}
                    {course.skills.length === 0 && <span className="text-xs text-slate-400">No skills defined.</span>}
                  </div>
                </div>
              </div>
            ))}
            {dashboardData?.active_courses?.length === 0 && (
              <div className="p-8 text-center text-slate-500">No courses running.</div>
            )}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-indigo-900 rounded-xl shadow-lg border border-indigo-800 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-indigo-800 bg-indigo-950">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="text-indigo-400" /> AI Insights & Proposals
            </h2>
            <p className="text-indigo-300 text-sm mt-1">Recommended new courses based on local skill gaps.</p>
          </div>
          
          <div className="p-6 space-y-4 flex-1">
            {dashboardData?.recommendations?.map((rec: any, idx: number) => (
              <div key={idx} className="bg-indigo-800/50 rounded-lg p-4 border border-indigo-700 hover:bg-indigo-800 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-indigo-50 text-sm">{rec.suggested_course}</h3>
                  <div className="flex items-center gap-1 bg-amber-500/20 text-amber-300 px-2 py-1 rounded text-[10px] font-black tracking-wider">
                    <TrendingUp size={12} /> {rec.local_demand_score} SCORE
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] uppercase font-bold text-indigo-300">Target Gap:</span>
                  <span className="text-xs font-bold text-indigo-100 bg-indigo-700 px-2 py-0.5 rounded">{rec.target_skill}</span>
                </div>
                <p className="text-xs text-indigo-200 flex items-start gap-1.5 leading-relaxed">
                  <AlertCircle size={14} className="shrink-0 mt-0.5 text-indigo-400" />
                  {rec.reasoning}
                </p>
                <button className="w-full mt-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded transition-colors">
                  Draft Curriculum
                </button>
              </div>
            ))}
            {dashboardData?.recommendations?.length === 0 && (
              <p className="text-indigo-300 text-sm text-center py-4">Your curriculum aligns perfectly with local demand!</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
