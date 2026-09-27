import { Link } from 'react-router-dom';
import { Shield, ArrowRight, BarChart2, BookOpen, MapPin, Award, Users } from 'lucide-react';

export default function GovernmentLanding() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-indigo-500/20 rounded-full mb-6">
            <Shield size={48} className="text-indigo-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            Government Labour-Market Intelligence
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Evidence-based intelligence for aligning skills, training capacity and curriculum with evolving industry demand.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/government/login" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md">
              Government Login
            </Link>
            <a href="#capabilities" className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-xl transition-all border border-slate-700">
              Explore Capabilities
            </a>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Government Portal Capabilities</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <BarChart2 className="text-indigo-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-slate-800 mb-2">Labour-Market Intelligence</h3>
              <ul className="text-slate-600 space-y-2 mt-4 text-sm">
                <li>• Monitor job demand</li>
                <li>• Track skill demand</li>
                <li>• Identify emerging skills</li>
                <li>• Analyze industry trends</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <BookOpen className="text-indigo-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-slate-800 mb-2">Curriculum Intelligence</h3>
              <ul className="text-slate-600 space-y-2 mt-4 text-sm">
                <li>• Analyze industry-required skills</li>
                <li>• Review course skills</li>
                <li>• Identify missing skills</li>
                <li>• Track emerging technologies</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <MapPin className="text-indigo-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-slate-800 mb-2">District Skill Planning</h3>
              <ul className="text-slate-600 space-y-2 mt-4 text-sm">
                <li>• Analyze district demand</li>
                <li>• Monitor training capacity</li>
                <li>• Track placement outcomes</li>
                <li>• Map trainers and equipment</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <Award className="text-indigo-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-slate-800 mb-2">Placement Intelligence</h3>
              <ul className="text-slate-600 space-y-2 mt-4 text-sm">
                <li>• Monitor placement rates</li>
                <li>• Track salary ranges</li>
                <li>• Review employment outcomes</li>
                <li>• Analyze employer feedback</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <Users className="text-indigo-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-slate-800 mb-2">Training Ecosystem</h3>
              <ul className="text-slate-600 space-y-2 mt-4 text-sm">
                <li>• Monitor training institutes</li>
                <li>• Track active courses</li>
                <li>• Manage trainer capacity</li>
                <li>• Assess equipment readiness</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-12">Government Intelligence Workflow</h2>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm font-bold text-slate-700">
            <div className="bg-white border border-slate-200 px-6 py-3 rounded-lg shadow-sm">Industry</div>
            <ArrowRight className="text-slate-300 self-center" />
            <div className="bg-white border border-slate-200 px-6 py-3 rounded-lg shadow-sm">Labour Market</div>
            <ArrowRight className="text-slate-300 self-center" />
            <div className="bg-white border border-slate-200 px-6 py-3 rounded-lg shadow-sm">Skills</div>
            <ArrowRight className="text-slate-300 self-center" />
            <div className="bg-white border border-slate-200 px-6 py-3 rounded-lg shadow-sm">Courses</div>
            <ArrowRight className="text-slate-300 self-center" />
            <div className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-sm">Government Intelligence</div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-indigo-900 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-black text-white mb-8">Ready to access SkillAlign AI Government Intelligence?</h2>
          <Link to="/government/login" className="bg-white text-indigo-900 hover:bg-slate-100 font-bold py-4 px-10 rounded-xl transition-all shadow-xl text-lg">
            Government Login
          </Link>
        </div>
      </section>
    </div>
  );
}
