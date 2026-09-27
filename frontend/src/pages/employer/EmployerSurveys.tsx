import { useState } from 'react';
import { FileText, Send, CheckCircle, Clock } from 'lucide-react';

export default function EmployerSurveys() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <FileText className="text-indigo-600" /> Employer Skill Demand Survey
        </h1>
        <p className="text-slate-500 mt-2">
          Help shape the training curriculum by providing your upcoming hiring needs and skill gaps.
        </p>
      </div>

      {submitted ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center">
          <CheckCircle className="text-emerald-500 w-16 h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-emerald-800">Survey Submitted Successfully!</h2>
          <p className="text-emerald-600 mt-2">
            Thank you for your valuable input. The Government Authority will review these demands to allocate training funds appropriately.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="mt-6 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
          >
            Submit Another Response
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }} 
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Primary Industry Sector</label>
              <select className="w-full border border-slate-200 rounded-lg p-3 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none">
                <option>Information Technology</option>
                <option>Manufacturing</option>
                <option>Healthcare</option>
                <option>Construction</option>
                <option>Finance</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Hiring Outlook (Next 6 Months)</label>
              <div className="flex gap-4">
                <label className="flex-1 border border-slate-200 rounded-lg p-4 cursor-pointer hover:bg-indigo-50 transition-colors flex items-center gap-3">
                  <input type="radio" name="outlook" className="w-4 h-4 text-indigo-600" defaultChecked />
                  <span className="font-medium text-slate-700">Expanding (Hiring aggressively)</span>
                </label>
                <label className="flex-1 border border-slate-200 rounded-lg p-4 cursor-pointer hover:bg-indigo-50 transition-colors flex items-center gap-3">
                  <input type="radio" name="outlook" className="w-4 h-4 text-indigo-600" />
                  <span className="font-medium text-slate-700">Stable (Replacement hiring only)</span>
                </label>
                <label className="flex-1 border border-slate-200 rounded-lg p-4 cursor-pointer hover:bg-indigo-50 transition-colors flex items-center gap-3">
                  <input type="radio" name="outlook" className="w-4 h-4 text-indigo-600" />
                  <span className="font-medium text-slate-700">Reducing (Hiring freeze)</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Most Critical Skill Gaps Currently Faced</label>
              <textarea 
                className="w-full border border-slate-200 rounded-lg p-3 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none min-h-[100px]" 
                placeholder="e.g. Lack of hands-on experience with cloud infrastructure deployment, weak communication skills among fresh graduates..."
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Top 3 Technical Skills Needed</label>
              <div className="space-y-3">
                <input type="text" className="w-full border border-slate-200 rounded-lg p-3 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="1. Skill (e.g. React.js)" required />
                <input type="text" className="w-full border border-slate-200 rounded-lg p-3 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="2. Skill (e.g. Python)" required />
                <input type="text" className="w-full border border-slate-200 rounded-lg p-3 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="3. Skill (e.g. AWS)" required />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button type="button" className="px-6 py-2 border border-slate-200 text-slate-600 font-bold rounded-lg hover:bg-slate-50 transition-colors">
                Save Draft
              </button>
              <button type="submit" className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                <Send size={18} /> Submit Survey
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mt-6">
        <h3 className="font-bold text-slate-800 mb-4">Past Submissions</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-4 border border-slate-100 rounded-lg bg-slate-50">
            <div className="flex items-center gap-3">
              <FileText className="text-slate-400" size={20} />
              <div>
                <p className="font-medium text-slate-700">Q3 2026 Hiring Demand Survey</p>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1"><Clock size={12}/> Submitted on Aug 15, 2026</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">Processed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
