import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FileText, CheckCircle, Clock, UploadCloud, Target, Briefcase, BookOpen, AlertTriangle } from 'lucide-react';
import api from '../../services/api';

interface CandidateSkill {
  skill_name: string;
  verified: boolean;
  source: string;
}

interface CandidateData {
  id: number;
  first_name: string;
  last_name: string;
  resume_text: string;
  skills: CandidateSkill[];
}

import { getUserId } from '../../utils/auth';

export default function CandidateProfile() {
  const location = useLocation();
  const [candidate, setCandidate] = useState<CandidateData | null>(null);
  const [jobMatches, setJobMatches] = useState<any[]>([]);
  const [courseRecs, setCourseRecs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Get dynamic user ID from JWT token
  const candidateId = getUserId();

  useEffect(() => {
    async function fetchData() {
      try {
        const [candRes, matchRes, courseRes] = await Promise.all([
          api.get(`/candidates/${candidateId}`),
          api.get(`/candidates/${candidateId}/job-matches`),
          api.get(`/candidates/${candidateId}/course-recommendations`)
        ]);
        setCandidate(candRes.data);
        setJobMatches(matchRes.data);
        setCourseRecs(courseRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.replace('#', ''));
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [loading, location.hash]);

  if (loading) return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );
  
  if (!candidate) return <div className="p-10">Candidate not found.</div>;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-2xl font-bold">
            {candidate.first_name[0]}{candidate.last_name[0]}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Welcome back, {candidate.first_name}!
            </h1>
            <p className="text-slate-500 text-sm mt-1">Manage your skills, view job matches, and track your career growth.</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <UploadCloud size={16} />
            Update Resume
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Skills */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <FileText className="text-indigo-600" />
              My Skill Profile
            </h3>
            
            <div className="space-y-3">
              {candidate.skills.map((skill, index) => (
                <div key={index} className="flex flex-col p-3 rounded-lg border border-slate-100 bg-slate-50">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-slate-700">{skill.skill_name}</span>
                    {skill.verified ? (
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold">
                        <CheckCircle size={10} /> VERIFIED
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-[10px] font-bold">
                        <Clock size={10} /> SELF-REPORTED
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 uppercase mt-2">Source: {skill.source}</p>
                </div>
              ))}
              {candidate.skills.length === 0 && <p className="text-sm text-slate-500">No skills identified yet. Upload your resume.</p>}
            </div>
            
            <button className="w-full mt-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-sm font-bold transition-colors">
              Take Verification Assessment
            </button>
          </div>
        </div>
        
        {/* Right Column: AI Matches & Courses */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* AI Job Matches */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-indigo-900 p-6 text-white">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Target className="text-indigo-300" />
                AI Job Recommendations
              </h3>
              <p className="text-indigo-200 text-sm mt-1">Jobs matched directly to your verified and self-reported skills.</p>
            </div>
            
            <div className="p-6 space-y-4">
              {jobMatches.map((match, idx) => (
                <div key={idx} className="border border-slate-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                        <Briefcase size={16} className="text-slate-400" /> {match.job_title}
                      </h4>
                      <p className="text-sm text-slate-500 mt-1">Employer ID: {match.employer_id}</p>
                    </div>
                    <div className="bg-indigo-100 text-indigo-800 text-sm font-black px-3 py-1 rounded-full">
                      {Math.round(match.match_score)}% MATCH
                    </div>
                  </div>
                  
                  {match.missing_skills?.length > 0 && (
                    <div id="skill-gap" className="mt-4 pt-4 border-t border-slate-100 scroll-mt-24">
                      <p className="text-xs uppercase font-bold text-slate-500 mb-2 flex items-center gap-1">
                        <AlertTriangle size={12} className="text-amber-500" /> Missing Skills for this role
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {match.missing_skills.map((ms: string, i: number) => (
                          <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-semibold border border-slate-200">
                            {ms}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-4 flex justify-end">
                    <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-lg transition-colors">
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
              {jobMatches.length === 0 && <p className="text-sm text-slate-500">No job matches found.</p>}
            </div>
          </div>
          
          {/* AI Course Recommendations */}
          {courseRecs.length > 0 && (
            <div id="recommended-courses" className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl shadow-sm border border-emerald-100 p-6 scroll-mt-24">
              <h3 className="text-lg font-bold text-emerald-900 mb-2 flex items-center gap-2">
                <BookOpen className="text-emerald-600" />
                Upskill Recommendations
              </h3>
              <p className="text-sm text-emerald-700 mb-4">Take these courses to bridge your skill gaps and improve your job match scores.</p>
              
              <div className="space-y-3">
                {courseRecs.map((course, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-4 shadow-sm border border-emerald-200 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-emerald-900">{course.course_name}</h4>
                      <p className="text-xs text-emerald-600 mt-1">Duration: {course.duration_weeks} weeks</p>
                      <div className="flex gap-1 mt-2">
                        <span className="text-xs text-slate-500">Bridges:</span>
                        {course.bridged_skills.map((skill: string, i: number) => (
                          <span key={i} className="text-xs font-bold text-emerald-700">{skill}{i < course.bridged_skills.length - 1 ? ', ' : ''}</span>
                        ))}
                      </div>
                    </div>
                    <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded transition-colors">
                      Enroll
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
