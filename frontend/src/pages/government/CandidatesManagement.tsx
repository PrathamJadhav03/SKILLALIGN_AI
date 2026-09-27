import React, { useEffect, useState } from 'react';
import { Users, Search, Filter, ChevronLeft, ChevronRight, CheckCircle, ShieldAlert, Sparkles, Target } from 'lucide-react';
import api from '../../services/api';

export default function CandidatesManagement() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const limit = 10;
  
  // Job Match State
  const [matchingCandidateId, setMatchingCandidateId] = useState<number | null>(null);
  const [jobMatches, setJobMatches] = useState<any[]>([]);
  const [matchLoading, setMatchLoading] = useState(false);

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/candidates?skip=${page * limit}&limit=${limit}`);
        setCandidates(response.data);
      } catch (error) {
        console.error("Error fetching candidates", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, [page]);

  const handleAIJobMatch = async (candidateId: number) => {
    if (matchingCandidateId === candidateId) {
        // Toggle close
        setMatchingCandidateId(null);
        return;
    }
    
    setMatchingCandidateId(candidateId);
    setMatchLoading(true);
    setJobMatches([]);
    
    try {
        const response = await api.get(`/candidates/${candidateId}/job-matches`);
        setJobMatches(response.data);
    } catch (error) {
        console.error("Error matching jobs", error);
    } finally {
        setMatchLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Users className="text-indigo-600" /> Candidate Profiling & Matches
          </h1>
          <p className="text-slate-500 text-sm mt-1">Review workforce candidate profiles, skill verification, and AI-driven job matches.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, ID, or skills..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-sm transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
            <Filter size={16} />
            Filter Status
          </button>
        </div>

        {loading ? (
          <div className="p-12 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider font-semibold text-slate-500">
                  <th className="p-4">Candidate Profile</th>
                  <th className="p-4">Extracted Skills</th>
                  <th className="p-4 text-center">Trust Factor</th>
                  <th className="p-4 text-right">AI Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {candidates.map((cand) => (
                  <React.Fragment key={cand.id}>
                    <tr className={`hover:bg-slate-50 transition-colors ${matchingCandidateId === cand.id ? 'bg-indigo-50/30' : ''}`}>
                      <td className="p-4">
                        <p className="text-sm font-bold text-slate-800">{cand.first_name} {cand.last_name}</p>
                        <p className="text-xs text-slate-500 mt-1">Candidate ID: {cand.id}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1 max-w-sm">
                          {cand.skills && cand.skills.slice(0, 4).map((skill: any, idx: number) => (
                            <span key={idx} className={`px-2 py-1 rounded text-[10px] font-bold border flex items-center gap-1 ${
                                skill.verified 
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                                : 'bg-slate-100 text-slate-600 border-slate-200'
                            }`}>
                              {skill.verified && <CheckCircle size={10} />}
                              {skill.skill_name}
                            </span>
                          ))}
                          {cand.skills && cand.skills.length > 4 && (
                            <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold border border-slate-200">
                              +{cand.skills.length - 4}
                            </span>
                          )}
                          {(!cand.skills || cand.skills.length === 0) && (
                            <span className="text-xs text-slate-400">No skills listed</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-600">
                           {cand.skills?.filter((s:any) => s.verified).length > 0 ? (
                               <><ShieldAlert size={14} className="text-emerald-500" /> VERIFIED</>
                           ) : (
                               <><ShieldAlert size={14} className="text-amber-500" /> SELF-REPORTED</>
                           )}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button 
                            onClick={() => handleAIJobMatch(cand.id)}
                            className={`px-3 py-1.5 rounded-lg transition-colors text-xs font-bold flex items-center justify-center gap-1.5 ml-auto border ${
                                matchingCandidateId === cand.id 
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200' 
                                : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
                            }`}
                        >
                          <Sparkles size={14} />
                          {matchingCandidateId === cand.id ? 'Close Matcher' : 'Match Jobs'}
                        </button>
                      </td>
                    </tr>
                    
                    {/* Expandable Match Row */}
                    {matchingCandidateId === cand.id && (
                        <tr>
                            <td colSpan={4} className="p-0 border-b-2 border-indigo-200 bg-indigo-50/10">
                                <div className="p-6">
                                    <h4 className="text-sm font-bold text-indigo-900 mb-4 flex items-center gap-2">
                                        <Target size={16} className="text-indigo-600" />
                                        AI Job Recommendations for {cand.first_name}
                                    </h4>
                                    
                                    {matchLoading ? (
                                        <div className="flex items-center gap-3 text-sm text-indigo-600 py-4">
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
                                            Running alignment engine...
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                            {jobMatches.map((match, idx) => (
                                                <div key={idx} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm relative overflow-hidden">
                                                    <div className="absolute top-0 right-0 bottom-0 w-1 bg-gradient-to-b from-indigo-400 to-indigo-600"></div>
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h5 className="font-bold text-slate-800 text-sm">{match.job_title}</h5>
                                                        <div className="bg-indigo-100 text-indigo-800 text-xs font-black px-2 py-1 rounded">
                                                            {Math.round(match.match_score)}% MATCH
                                                        </div>
                                                    </div>
                                                    
                                                    {match.missing_skills?.length > 0 ? (
                                                        <div className="mt-3">
                                                            <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Skill Gap Warning</p>
                                                            <div className="flex flex-wrap gap-1">
                                                                {match.missing_skills.map((ms: string, i: number) => (
                                                                    <span key={i} className="px-1.5 py-0.5 bg-rose-50 text-rose-600 rounded text-[10px] font-semibold border border-rose-100">
                                                                        {ms}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="mt-3">
                                                            <p className="text-[10px] uppercase font-bold text-emerald-500 flex items-center gap-1">
                                                                <CheckCircle size={10} /> Fully Aligned Profile
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                            {jobMatches.length === 0 && !matchLoading && (
                                                <p className="text-sm text-slate-500 py-4">No suitable matches found at this time.</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    )}
                  </React.Fragment>
                ))}
                {candidates.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-500 text-sm">
                      No candidates found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="p-4 border-t border-slate-200 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing <span className="font-medium text-slate-700">{page * limit + 1}</span> to <span className="font-medium text-slate-700">{page * limit + candidates.length}</span> results
          </p>
          <div className="flex gap-2">
            <button 
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              disabled={candidates.length < limit}
              onClick={() => setPage(page + 1)}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
