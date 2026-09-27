import { Link } from 'react-router-dom';
import { Building2, ArrowRight, Briefcase, Users, MessageSquare, CheckCircle } from 'lucide-react';

export default function EmployerLanding() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-blue-500/20 rounded-full mb-6">
            <Building2 size={48} className="text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            Find the Skills Your Business Needs
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Connect industry requirements with skilled candidates and contribute directly to workforce and curriculum development.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/employer/login" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md">
              Employer Login
            </Link>
            <Link to="/register" className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-xl transition-all border border-slate-700">
              Register Organization
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Employer Features</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <Briefcase className="text-blue-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-slate-800 mb-4">Post Jobs</h3>
              <p className="text-slate-600 mb-4">Publish jobs with precisely defined requirements including role, location, skills, qualifications, experience, and salary.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <Users className="text-blue-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-slate-800 mb-4">Candidate Discovery</h3>
              <p className="text-slate-600 mb-4">Find candidates based on verified skills, qualifications, experience, location, and assessment results.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <MessageSquare className="text-blue-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-slate-800 mb-4">Employer Surveys</h3>
              <p className="text-slate-600 mb-4">Share your hiring challenges, skill shortages, required proficiencies, and future workforce needs directly with policymakers.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <CheckCircle className="text-blue-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-slate-800 mb-4">Curriculum Feedback</h3>
              <p className="text-slate-600 mb-4">Review state curricula, suggest critical skills, recommend training modules, and validate industry relevance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-12">Employer Workflow</h2>
          
          <div className="flex flex-wrap justify-center gap-3 text-sm font-bold text-slate-700">
            <div className="bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm">Post Job</div>
            <ArrowRight className="text-slate-300 self-center" />
            <div className="bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm">Define Skills</div>
            <ArrowRight className="text-slate-300 self-center" />
            <div className="bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm">AI Analysis</div>
            <ArrowRight className="text-slate-300 self-center" />
            <div className="bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm">Candidate Match</div>
            <ArrowRight className="text-slate-300 self-center" />
            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm">Placement</div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-blue-900 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-black text-white mb-8">Ready to transform your hiring?</h2>
          <Link to="/employer/login" className="bg-white text-blue-900 hover:bg-slate-100 font-bold py-4 px-10 rounded-xl transition-all shadow-xl text-lg">
            Employer Login
          </Link>
        </div>
      </section>
    </div>
  );
}
