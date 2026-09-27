import { Link } from 'react-router-dom';
import { Users, ArrowRight, UserCheck, TrendingUp, BookOpen, Briefcase, Bell } from 'lucide-react';

export default function CandidateLanding() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-amber-500/20 rounded-full mb-6">
            <Users size={48} className="text-amber-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            Build Skills. Find Opportunities.
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover the skills employers need, identify your skill gaps, find relevant training and connect with employment opportunities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/candidate/login" className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 px-8 rounded-xl transition-all shadow-md">
              Candidate Login
            </Link>
            <Link to="/register" className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-xl transition-all border border-slate-700">
              Create Profile
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">Candidate Features</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200">
              <UserCheck className="text-amber-500 mb-4" size={32} />
              <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-3">Build Your Profile</h3>
              <p className="text-slate-600 text-sm md:text-base">Add your education, skills, experience, certifications, location, and career interests to build a comprehensive profile.</p>
            </div>

            <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200">
              <TrendingUp className="text-amber-500 mb-4" size={32} />
              <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-3">Skill Assessment</h3>
              <p className="text-slate-600 text-sm md:text-base">Take technical assessments, MCQs, coding challenges, and situational questions to verify your expertise.</p>
            </div>

            <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200">
              <BookOpen className="text-amber-500 mb-4" size={32} />
              <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-3">Course Recommendations</h3>
              <p className="text-slate-600 text-sm md:text-base">Get courses recommended based on your skill gap, career goal, qualification, location, and course relevance.</p>
            </div>

            <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200">
              <Briefcase className="text-amber-500 mb-4" size={32} />
              <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-3">Job Matching</h3>
              <p className="text-slate-600 text-sm md:text-base">View highly accurate job matches based on your verified skills, qualification, experience, and location.</p>
            </div>

            <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200 lg:col-span-2">
              <Bell className="text-amber-500 mb-4" size={32} />
              <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-3">Job Notifications</h3>
              <p className="text-slate-600 text-sm md:text-base">Get notified instantly via in-app alerts, email, or SMS when relevant opportunities matching your preferences become available.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Candidate Journey Section */}
      <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-8 md:mb-12">Candidate Journey</h2>
          
          <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-3 md:gap-4 text-xs md:text-sm font-bold text-slate-700">
            <div className="bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm w-48 md:w-auto">Create Profile</div>
            <ArrowRight className="text-slate-300 hidden md:block" />
            <div className="bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm w-48 md:w-auto">Skill Assessment</div>
            <ArrowRight className="text-slate-300 hidden md:block" />
            <div className="bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm w-48 md:w-auto">Skill Gap Analysis</div>
            <ArrowRight className="text-slate-300 hidden md:block" />
            <div className="bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm w-48 md:w-auto">Learning</div>
            <ArrowRight className="text-slate-300 hidden md:block" />
            <div className="bg-amber-500 text-slate-900 px-4 py-2 rounded-lg shadow-sm w-48 md:w-auto">Employment</div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-amber-500 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-8">Ready to accelerate your career?</h2>
          <Link to="/candidate/login" className="bg-slate-900 text-white hover:bg-slate-800 font-bold py-3 md:py-4 px-8 md:px-10 rounded-xl transition-all shadow-xl text-base md:text-lg inline-block">
            Candidate Login
          </Link>
        </div>
      </section>
    </div>
  );
}
