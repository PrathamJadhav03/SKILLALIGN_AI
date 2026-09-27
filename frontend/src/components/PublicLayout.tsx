import { Link, Outlet } from 'react-router-dom';
import { Target, Menu } from 'lucide-react';
import { useState } from 'react';

export default function PublicLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <Target className="text-white" size={24} />
              </div>
              <span className="text-xl font-black text-slate-800 tracking-tight">SkillAlign AI</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              <Link to="/" className="text-slate-600 hover:text-indigo-600 font-medium text-sm transition-colors">Home</Link>
              <div className="relative group">
                <button className="text-slate-600 hover:text-indigo-600 font-medium text-sm transition-colors py-2">
                  Portals
                </button>
                <div className="absolute top-full left-0 w-48 bg-white border border-slate-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left -translate-y-2 group-hover:translate-y-0">
                  <div className="py-2">
                    <Link to="/government" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600">Government</Link>
                    <Link to="/employer" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600">Employers</Link>
                    <Link to="/institute" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600">Training Institutes</Link>
                    <Link to="/candidate" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600">Candidates</Link>
                  </div>
                </div>
              </div>
              <div className="h-6 w-px bg-slate-200 mx-2"></div>
              <Link to="/register" className="text-indigo-600 hover:text-indigo-700 font-bold text-sm transition-colors px-2">
                Register
              </Link>
              <div className="relative group">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-bold text-sm transition-colors shadow-sm">
                  Login
                </button>
                <div className="absolute top-full right-0 w-48 bg-white border border-slate-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right mt-2">
                  <div className="py-2">
                    <Link to="/government/login" className="block px-4 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600">Government Login</Link>
                    <Link to="/employer/login" className="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600">Employer Login</Link>
                    <Link to="/institute/login" className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-600">Institute Login</Link>
                    <Link to="/candidate/login" className="block px-4 py-2 text-sm text-slate-700 hover:bg-amber-50 hover:text-amber-600">Candidate Login</Link>
                  </div>
                </div>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white shadow-lg absolute w-full left-0">
            <div className="px-4 py-3 space-y-3">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block text-slate-700 font-medium py-2">Home</Link>
              <div className="py-1">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Portals</span>
                <div className="pl-4 space-y-2 border-l-2 border-slate-100">
                  <Link to="/government" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-600">Government</Link>
                  <Link to="/employer" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-600">Employers</Link>
                  <Link to="/institute" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-600">Training Institutes</Link>
                  <Link to="/candidate" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-600">Candidates</Link>
                </div>
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-4">Login</span>
                <div className="pl-4 space-y-2 border-l-2 border-slate-100 mb-4">
                  <Link to="/government/login" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-600">Government Login</Link>
                  <Link to="/employer/login" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-600">Employer Login</Link>
                  <Link to="/institute/login" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-600">Institute Login</Link>
                  <Link to="/candidate/login" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-600">Candidate Login</Link>
                </div>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center bg-white border-2 border-indigo-600 text-indigo-600 px-5 py-2 rounded-lg font-bold text-sm">
                  Register
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="bg-indigo-500 p-1 rounded-lg">
                  <Target className="text-white" size={20} />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">SkillAlign AI</span>
              </Link>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                Labour-Market Intelligence & Skill-Curriculum Alignment Platform. Connecting industry demand, workforce skills, training programs and government planning.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Portals</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/government" className="hover:text-indigo-400 transition-colors">Government</Link></li>
                <li><Link to="/employer" className="hover:text-indigo-400 transition-colors">Employers</Link></li>
                <li><Link to="/institute" className="hover:text-indigo-400 transition-colors">Training Institutes</Link></li>
                <li><Link to="/candidate" className="hover:text-indigo-400 transition-colors">Candidates</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center">
            <p>© 2026 SkillAlign AI. All rights reserved.</p>
            <p className="mt-2 md:mt-0 text-xs text-slate-600">Platform example data is illustrative.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
