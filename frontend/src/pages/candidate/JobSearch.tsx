import { useEffect, useState } from 'react';
import { Search, Briefcase, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../../services/api';

interface JobMatch {
  job_id: number;
  job_title: string;
  employer_name: string;
  match_percentage: number;
  matched_skills: string[];
  missing_skills: string[];
}

export default function JobSearch() {
  const [matches, setMatches] = useState<JobMatch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Mock matching against Candidate ID 1 for prototype demonstration
        const res = await api.get('/candidates/1/job-matches');
        
        // Filter duplicate mock jobs for UI clarity (since we posted the same job 3 times in tests)
        const uniqueJobs = Array.from(new Set(res.data.map((j: any) => j.job_id)))
          .map(id => res.data.find((j: any) => j.job_id === id));
          
        setMatches(uniqueJobs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-10">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
          <Search className="text-indigo-600" size={32} />
          Job Opportunities
        </h1>
        <p className="text-slate-500 mt-2">Personalized matches powered by SkillAlign AI.</p>
      </header>

      <div className="max-w-5xl space-y-6">
        {loading ? (
          <p className="text-slate-500">Running matching algorithms...</p>
        ) : (
          <>
            {matches.map(match => (
              <div key={match.job_id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
                {/* Job Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                      <Briefcase size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{match.job_title}</h3>
                      <p className="text-sm font-medium text-slate-500">{match.employer_name}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center gap-6">
                    <div className="flex-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <h4 className="text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-1"><CheckCircle size={14} className="text-emerald-500"/> Matched Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {match.matched_skills.map(s => <span key={s} className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded">{s}</span>)}
                        {match.matched_skills.length === 0 && <span className="text-xs text-slate-400">None</span>}
                      </div>
                    </div>
                    <div className="flex-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <h4 className="text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-1"><AlertCircle size={14} className="text-amber-500"/> Missing Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {match.missing_skills.map(s => <span key={s} className="px-2 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded">{s}</span>)}
                        {match.missing_skills.length === 0 && <span className="text-xs text-slate-400">None</span>}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Match Score */}
                <div className="w-full md:w-48 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-6 flex flex-col items-center justify-center">
                  <div className="relative w-24 h-24 flex items-center justify-center mb-3">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                      <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className={match.match_percentage > 70 ? "text-emerald-500" : match.match_percentage > 40 ? "text-indigo-500" : "text-amber-500"} strokeDasharray={251.2} strokeDashoffset={251.2 - (251.2 * match.match_percentage) / 100} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-xl font-black text-slate-800">{Math.round(match.match_percentage)}%</span>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-lg transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
            {matches.length === 0 && <p className="text-slate-500">No jobs found matching your profile.</p>}
          </>
        )}
      </div>
    </div>
  );
}
