import { useEffect, useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { 
  Download, Calendar, MapPin, AlertTriangle, CheckCircle, Info 
} from 'lucide-react';
import api from '../../services/api';

const PIE_COLORS = ['#22c55e', '#eab308', '#ef4444'];

export default function GovernmentDashboard() {
  const [summary, setSummary] = useState<any>(null);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [demand, setDemand] = useState<any[]>([]);
  const [jobTrend, setJobTrend] = useState<any[]>([]);
  const [demandSupply, setDemandSupply] = useState<any[]>([]);
  const [curriculumAlignment, setCurriculumAlignment] = useState<any[]>([]);
  const [placementOutcomes, setPlacementOutcomes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sum, alt, dem, , jt, ds, ca, po] = await Promise.all([
          api.get('/dashboard/summary'),
          api.get('/dashboard/alerts'),
          api.get('/dashboard/demand'),
          api.get('/dashboard/emerging-skills'),
          api.get('/dashboard/charts/job-trend'),
          api.get('/dashboard/charts/demand-supply'),
          api.get('/dashboard/charts/curriculum-alignment'),
          api.get('/dashboard/charts/placement-outcomes')
        ]);
        
        setSummary(sum.data);
        setAlerts(alt.data);
        setDemand(dem.data);
        setJobTrend(jt.data);
        setDemandSupply(ds.data);
        setCurriculumAlignment(ca.data);
        setPlacementOutcomes(po.data);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Maharashtra Skill Intelligence</h1>
          <p className="text-slate-500 text-sm mt-1">Labour Market & Training Ecosystem Overview</p>
          <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
            <Info size={12} /> Last updated: {new Date().toLocaleString()}
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-600">
            <Calendar size={16} className="text-slate-400" />
            <span>Last 6 Months</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-600">
            <MapPin size={16} className="text-slate-400" />
            <span>All Districts</span>
          </div>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {[
          { label: 'Active Jobs', data: summary?.active_jobs },
          { label: 'Employers', data: summary?.employers },
          { label: 'Candidates', data: summary?.candidates },
          { label: 'Training Centres', data: summary?.training_centres },
          { label: 'Courses', data: summary?.courses },
          { label: 'Emerging Skills', data: summary?.emerging_skills },
          { label: 'Curriculum Reviews', data: summary?.curriculum_reviews },
          { label: 'Placement Rate', data: summary?.placement_rate }
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:border-indigo-300 transition-colors cursor-pointer group">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 line-clamp-1" title={kpi.label}>{kpi.label}</p>
            <p className="text-xl font-bold text-slate-800">{kpi.data?.value || 0}</p>
            <p className={`text-xs mt-2 font-medium flex items-center gap-1 ${
              (kpi.data?.trend || '').includes('+') ? 'text-emerald-600' : 
              (kpi.data?.trend || '').includes('Action') ? 'text-amber-600' : 'text-slate-500'
            }`}>
              {kpi.data?.trend}
            </p>
          </div>
        ))}
      </div>

      {/* Intelligence Alerts */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <AlertTriangle size={18} className="text-amber-500" />
            Intelligence Alerts
          </h2>
        </div>
        <div className="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {alerts.map((alert) => (
            <div key={alert.id} className={`p-4 rounded-lg border cursor-pointer hover:shadow-md transition-shadow ${
              alert.type === 'warning' ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200'
            }`}>
              <div className="flex items-start gap-3">
                {alert.type === 'warning' ? <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" /> : <CheckCircle size={20} className="text-emerald-600 shrink-0 mt-0.5" />}
                <div>
                  <h4 className={`text-sm font-bold ${alert.type === 'warning' ? 'text-amber-900' : 'text-emerald-900'}`}>{alert.title}</h4>
                  <p className={`text-xs mt-1 leading-snug ${alert.type === 'warning' ? 'text-amber-700' : 'text-emerald-700'}`}>{alert.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Job Demand Trend */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Job Demand Trend</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={jobTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <RechartsTooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Line type="monotone" dataKey="jobs" stroke="#4f46e5" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Demand vs Training Supply */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Industry Demand VS Training Supply</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demandSupply} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis dataKey="skill" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 12, fontWeight: 500}} />
                <RechartsTooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Legend iconType="circle" />
                <Bar dataKey="demand" name="Industry Demand" fill="#4f46e5" radius={[0, 4, 4, 0]} barSize={12} />
                <Bar dataKey="supply" name="Training Supply" fill="#cbd5e1" radius={[0, 4, 4, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Three Column Layout: Skills & Outcomes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top Skills */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Top Skills</h2>
          <div className="space-y-4">
            {demand.slice(0, 6).map((skill: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3 w-1/2">
                  <span className="text-sm font-bold text-slate-400 w-4">{idx + 1}.</span>
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors truncate">{skill.skill}</span>
                </div>
                <div className="w-1/3">
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${(skill.demand_score / demand[0].demand_score) * 100}%` }}></div>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-500 w-10 text-right">{Math.round(skill.demand_score)}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors">
            View All Skills →
          </button>
        </div>

        {/* Curriculum Alignment */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-2">Curriculum Alignment</h2>
          <p className="text-xs text-slate-500 mb-4">Statewide Course vs Industry Matching</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={curriculumAlignment}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {curriculumAlignment.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            {curriculumAlignment.map((entry, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[index] }}></div>
                <span className="text-xs font-medium text-slate-600">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Placement Outcomes */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Placement Outcomes</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={placementOutcomes}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="course" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} />
                <RechartsTooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="rate" name="Placement %" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
      
    </div>
  );
}
