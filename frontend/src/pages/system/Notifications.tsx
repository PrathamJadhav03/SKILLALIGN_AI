import { Bell, AlertTriangle, Info, CheckCircle, Search, Settings } from 'lucide-react';

export default function Notifications() {
  const alerts = [
    {
      id: 1,
      type: "warning",
      title: "Severe Skill Gap Detected",
      message: "The demand for Data Analytics in Pune has surged by 40%, but training capacity remains stagnant. Recommend creating an incentive program for local institutes.",
      time: "10 mins ago"
    },
    {
      id: 2,
      type: "success",
      title: "10 Candidates Matched",
      message: "AI matching engine successfully paired 10 local candidates with the open Welder role at Tata Motors.",
      time: "1 hour ago"
    },
    {
      id: 3,
      type: "info",
      title: "New Course Curriculums Pending",
      message: "3 training institutes have submitted new courses for state approval.",
      time: "2 hours ago"
    },
    {
      id: 4,
      type: "warning",
      title: "High Attrition Warning",
      message: "Recent placement tracking shows high attrition rates in Retail roles in Mumbai district. Recommend curriculum review.",
      time: "5 hours ago"
    },
    {
      id: 5,
      type: "success",
      title: "System Update Complete",
      message: "Nightly NLP extraction run completed. 1,200 new candidate resumes parsed successfully.",
      time: "1 day ago"
    }
  ];

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Bell className="text-indigo-600" /> System Notifications
          </h1>
          <p className="text-slate-500 text-sm mt-1">Review critical alerts, AI insights, and system updates.</p>
        </div>
        
        <div className="flex gap-2">
          <button className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors">
            <Search size={18} />
          </button>
          <button className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors">
            <Settings size={18} />
          </button>
          <button className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-sm rounded-lg transition-colors">
            Mark all as read
          </button>
        </div>
      </div>

      {/* Alert Feed */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="divide-y divide-slate-100">
          {alerts.map((alert) => (
            <div key={alert.id} className="p-6 hover:bg-slate-50 transition-colors flex gap-4 items-start">
              <div className="mt-1 shrink-0">
                {alert.type === 'warning' && <AlertTriangle className="text-amber-500" size={24} />}
                {alert.type === 'success' && <CheckCircle className="text-emerald-500" size={24} />}
                {alert.type === 'info' && <Info className="text-blue-500" size={24} />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-slate-800">{alert.title}</h3>
                  <span className="text-xs font-bold text-slate-400 whitespace-nowrap ml-4">{alert.time}</span>
                </div>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">{alert.message}</p>
                <div className="mt-3 flex gap-2">
                  <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800">View Details</button>
                  <span className="text-slate-300">•</span>
                  <button className="text-xs font-bold text-slate-500 hover:text-slate-700">Dismiss</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
