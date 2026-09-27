import { Link } from 'react-router-dom';
import { Building, ArrowRight, BookOpen, UserCheck, Wrench, Award } from 'lucide-react';

export default function InstituteLanding() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-emerald-500/20 rounded-full mb-6">
            <Building size={48} className="text-emerald-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            Align Training With Industry Demand
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Use labour-market intelligence to improve courses, curriculum, trainers and training capacity.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/institute/login" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md">
              Institute Login
            </Link>
            <Link to="/register" className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-xl transition-all border border-slate-700">
              Register Institute
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Training Features</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <BookOpen className="text-emerald-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-slate-800 mb-4">Course Management</h3>
              <p className="text-slate-600 text-sm">Manage courses, modules, duration, qualifications, and specific skills taught.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <Award className="text-emerald-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-slate-800 mb-4">Curriculum Intelligence</h3>
              <p className="text-slate-600 text-sm">Identify missing skills, outdated modules, emerging technologies, and proficiency gaps based on market data.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <UserCheck className="text-emerald-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-slate-800 mb-4">Trainer Intelligence</h3>
              <p className="text-slate-600 text-sm">Monitor trainer skills, proficiency, and upskilling requirements to ensure quality education.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <Wrench className="text-emerald-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-slate-800 mb-4">Equipment Planning</h3>
              <p className="text-slate-600 text-sm">Monitor required equipment versus available inventory to identify critical infrastructure gaps.</p>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <Building className="text-emerald-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-slate-800 mb-4">Training Capacity</h3>
              <p className="text-slate-600 text-sm">Monitor seats, enrolment, utilization rates, and course availability across your institute.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <ArrowRight className="text-emerald-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-slate-800 mb-4">Placement Outcomes</h3>
              <p className="text-slate-600 text-sm">Track placement rates, top employers, job roles, average salary, and time to employment for your graduates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-12">Training Workflow</h2>
          
          <div className="flex flex-wrap justify-center gap-3 text-sm font-bold text-slate-700">
            <div className="bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm">Course</div>
            <ArrowRight className="text-slate-300 self-center" />
            <div className="bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm">Industry Skill Demand</div>
            <ArrowRight className="text-slate-300 self-center" />
            <div className="bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm">Skill Gap Analysis</div>
            <ArrowRight className="text-slate-300 self-center" />
            <div className="bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm">Curriculum Improvement</div>
            <ArrowRight className="text-slate-300 self-center" />
            <div className="bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-sm">Placement</div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-emerald-900 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-black text-white mb-8">Ready to align your curriculum?</h2>
          <Link to="/institute/login" className="bg-white text-emerald-900 hover:bg-slate-100 font-bold py-4 px-10 rounded-xl transition-all shadow-xl text-lg">
            Institute Login
          </Link>
        </div>
      </section>
    </div>
  );
}
