import { Link } from 'react-router-dom';
import { Shield, Building2, Building, Users, ArrowRight, Activity, BookOpen, Target, Briefcase } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 pt-16 pb-32 border-b border-slate-200">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold mb-8">
            <Target size={16} /> Data-Driven Intelligence
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
            SkillAlign AI
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
            Labour-Market Intelligence & Skill-Curriculum Alignment Platform.
            <span className="block text-lg mt-4 text-slate-500 font-normal">
              Connecting industry demand, workforce skills, training programs and government planning through data-driven intelligence.
            </span>
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#portals" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md flex items-center justify-center gap-2">
              Explore Platform <ArrowRight size={20} />
            </a>
            <Link to="/candidate/login" className="bg-white hover:bg-slate-50 text-indigo-600 border border-slate-200 font-bold py-3 px-8 rounded-xl transition-all shadow-sm">
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Why SkillAlign AI? */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Why SkillAlign AI?</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">Bridging the critical gap between education and employment.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-4">
                <Briefcase size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Industry Reality</h3>
              <p className="text-slate-600">Industry requirements change rapidly. Employers struggle to find candidates with the exact modern skills needed.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center mb-4">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Training Gap</h3>
              <p className="text-slate-600">Training curricula often become outdated, leaving candidates lacking required skills despite formal qualifications.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <Activity size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">The Solution</h3>
              <p className="text-slate-600">Continuous labour-market intelligence ensuring training capacity aligns perfectly with actual economic demand.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portals Section */}
      <section id="portals" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Platform Portals</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">Four integrated workspaces powered by a single intelligence engine.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Government */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow group">
              <div className="flex items-start gap-4">
                <div className="bg-indigo-100 text-indigo-600 p-4 rounded-xl group-hover:scale-110 transition-transform">
                  <Shield size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Government Portal</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Monitor labour-market trends, skill demand, curriculum alignment, training capacity, placement outcomes and district-level workforce requirements.
                  </p>
                  <Link to="/government" className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-800">
                    Explore Government Portal <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Employer */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow group">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 text-blue-600 p-4 rounded-xl group-hover:scale-110 transition-transform">
                  <Building2 size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Employer Portal</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Publish jobs, identify required skills, participate in employer surveys and provide curriculum feedback directly to policymakers.
                  </p>
                  <Link to="/employer" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800">
                    Explore Employer Portal <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Institute */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow group">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 text-emerald-600 p-4 rounded-xl group-hover:scale-110 transition-transform">
                  <Building size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Training Institute Portal</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Manage courses, curriculum, trainers, equipment, capacity and dynamically align with current industry requirements.
                  </p>
                  <Link to="/institute" className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-800">
                    Explore Training Portal <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Candidate */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow group">
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 text-amber-600 p-4 rounded-xl group-hover:scale-110 transition-transform">
                  <Users size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Candidate Portal</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Build your profile, assess your skills, identify skill gaps, discover relevant courses and find suitable employment opportunities.
                  </p>
                  <Link to="/candidate" className="inline-flex items-center gap-2 text-amber-600 font-bold hover:text-amber-800">
                    Explore Candidate Portal <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How it Works Flow */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black mb-16">How SkillAlign AI Works</h2>
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-bold text-indigo-200">
            <div className="bg-slate-800 p-4 rounded-xl w-40">Industry Demand</div>
            <ArrowRight className="hidden md:block opacity-50" />
            <div className="bg-slate-800 p-4 rounded-xl w-40">Skill Intelligence</div>
            <ArrowRight className="hidden md:block opacity-50" />
            <div className="bg-slate-800 p-4 rounded-xl w-40">Curriculum Alignment</div>
            <ArrowRight className="hidden md:block opacity-50" />
            <div className="bg-slate-800 p-4 rounded-xl w-40">Job Matching</div>
          </div>
        </div>
      </section>
    </div>
  );
}
