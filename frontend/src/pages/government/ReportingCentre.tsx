import { useEffect, useState } from 'react';
import { FileText, Download, BarChart2, PieChart, TrendingUp, Map } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import api from '../../services/api';

export default function ReportingCentre() {
  const [demandSupply, setDemandSupply] = useState<any[]>([]);
  const [jobTrends, setJobTrends] = useState<any[]>([]);
  
  // Mock District Employment Rates for complex graphing
  const districtEmployment = [
    { district: "Mumbai", employed: 85000, unemployed: 12000, rate: 87.6 },
    { district: "Pune", employed: 72000, unemployed: 14000, rate: 83.7 },
    { district: "Nagpur", employed: 45000, unemployed: 15000, rate: 75.0 },
    { district: "Nashik", employed: 38000, unemployed: 18000, rate: 67.8 },
    { district: "Aurangabad", employed: 29000, unemployed: 22000, rate: 56.8 }
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const [dsRes, jtRes] = await Promise.all([
          api.get('/dashboard/charts/demand-supply'),
          api.get('/dashboard/charts/job-trend')
        ]);
        setDemandSupply(dsRes.data);
        setJobTrends(jtRes.data);
      } catch (err) {
        console.error("Error fetching report data", err);
      }
    }
    fetchData();
  }, []);

  const handleDownload = (reportName: string) => {
    // Mock CSV download
    alert(`Downloading ${reportName}.csv...`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <BarChart2 className="text-indigo-600" /> Analytics & Reporting Engine
          </h1>
          <p className="text-slate-500 text-sm mt-1">Generate comprehensive labour market reports and export intelligence data.</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => handleDownload('Master_Intelligence_Report')}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Download size={16} />
            Export Master Report
          </button>
        </div>
      </div>

      {/* Quick Export Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-32">
          <div className="flex items-center gap-2 text-slate-700 font-bold">
            <FileText className="text-emerald-500" size={20} /> Skills Gap Report
          </div>
          <button onClick={() => handleDownload('Skills_Gap_Q3')} className="text-sm font-bold text-emerald-600 hover:text-emerald-800 text-left flex items-center justify-between">
            Download CSV <Download size={14} />
          </button>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-32">
          <div className="flex items-center gap-2 text-slate-700 font-bold">
            <Map className="text-indigo-500" size={20} /> District Employment
          </div>
          <button onClick={() => handleDownload('District_Employment')} className="text-sm font-bold text-indigo-600 hover:text-indigo-800 text-left flex items-center justify-between">
            Download CSV <Download size={14} />
          </button>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-32">
          <div className="flex items-center gap-2 text-slate-700 font-bold">
            <PieChart className="text-amber-500" size={20} /> Curriculum Alignment
          </div>
          <button onClick={() => handleDownload('Curriculum_Alignment')} className="text-sm font-bold text-amber-600 hover:text-amber-800 text-left flex items-center justify-between">
            Download CSV <Download size={14} />
          </button>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-32">
          <div className="flex items-center gap-2 text-slate-700 font-bold">
            <TrendingUp className="text-blue-500" size={20} /> Top Emerging Skills
          </div>
          <button onClick={() => handleDownload('Emerging_Skills')} className="text-sm font-bold text-blue-600 hover:text-blue-800 text-left flex items-center justify-between">
            Download CSV <Download size={14} />
          </button>
        </div>
      </div>

      {/* Complex Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* District Employment Rates */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Map className="text-indigo-500" size={18} /> Regional Employment Metrics
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={districtEmployment} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="district" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis yAxisId="left" orientation="left" stroke="#818cf8" tick={{fontSize: 12}} />
                <YAxis yAxisId="right" orientation="right" stroke="#f43f5e" tick={{fontSize: 12}} />
                <RechartsTooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="employed" name="Employed" fill="#818cf8" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="unemployed" name="Unemployed" fill="#fb7185" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Supply vs Demand */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <TrendingUp className="text-emerald-500" size={18} /> Skill Supply vs. Market Demand
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={demandSupply} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSupply" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="skill" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <RechartsTooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Legend />
                <Area type="monotone" dataKey="demand" stroke="#10b981" fillOpacity={1} fill="url(#colorDemand)" />
                <Area type="monotone" dataKey="supply" stroke="#6366f1" fillOpacity={1} fill="url(#colorSupply)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Historical Job Postings Trend */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <BarChart2 className="text-amber-500" size={18} /> Aggregate Job Creation Trend
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={jobTrends} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <RechartsTooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Line type="monotone" dataKey="jobs" stroke="#f59e0b" strokeWidth={3} dot={{r: 6, fill: '#f59e0b', stroke: '#fff', strokeWidth: 2}} activeDot={{r: 8}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
