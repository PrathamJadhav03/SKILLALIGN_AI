import { useEffect, useState } from 'react';
import { Map as MapIcon, MapPin, Building, Users, Briefcase, TrendingUp, AlertTriangle } from 'lucide-react';
import api from '../../services/api';

export default function DistrictPlanning() {
  const [districts, setDistricts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await api.get('/districts');
        setDistricts(response.data);
        if (response.data.length > 0) {
          setSelectedDistrict(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching districts", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDistricts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <MapIcon className="text-indigo-600" /> Geographic Intelligence
          </h1>
          <p className="text-slate-500 text-sm mt-1">Regional skill gaps, training capacity, and demographic planning.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* District List/Map Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[700px]">
          <div className="p-4 border-b border-slate-200 bg-slate-50">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              <MapPin size={18} className="text-indigo-600" /> 
              Maharashtra Districts
            </h2>
          </div>
          <div className="overflow-y-auto flex-1 p-2">
            <div className="space-y-2">
              {districts.map((district) => (
                <button
                  key={district.id}
                  onClick={() => setSelectedDistrict(district)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selectedDistrict?.id === district.id
                      ? 'bg-indigo-50 border-indigo-200 shadow-sm'
                      : 'bg-white border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`font-bold ${selectedDistrict?.id === district.id ? 'text-indigo-900' : 'text-slate-800'}`}>
                        {district.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{district.region} Region</p>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-bold ${
                      district.skill_gap_index > 60 ? 'bg-rose-100 text-rose-700' :
                      district.skill_gap_index > 30 ? 'bg-amber-100 text-amber-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      Gap: {district.skill_gap_index}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* District Details Panel */}
        <div className="lg:col-span-2 space-y-6">
          {selectedDistrict ? (
            <>
              {/* Detailed Header */}
              <div className="bg-slate-900 rounded-xl p-8 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <MapIcon size={120} />
                </div>
                <div className="relative z-10">
                  <h2 className="text-3xl font-black mb-2">{selectedDistrict.name}</h2>
                  <p className="text-slate-300">{selectedDistrict.region} Region • Code: {selectedDistrict.code}</p>
                </div>
              </div>

              {/* District KPIs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                  <Users size={24} className="text-indigo-500 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Candidates</p>
                  <p className="text-2xl font-black text-slate-800">{selectedDistrict.total_candidates}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                  <Briefcase size={24} className="text-emerald-500 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Jobs</p>
                  <p className="text-2xl font-black text-slate-800">{selectedDistrict.active_jobs}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                  <Building size={24} className="text-blue-500 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Training Centers</p>
                  <p className="text-2xl font-black text-slate-800">{selectedDistrict.training_centers}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                  <AlertTriangle size={24} className={`mx-auto mb-2 ${
                      selectedDistrict.skill_gap_index > 60 ? 'text-rose-500' :
                      selectedDistrict.skill_gap_index > 30 ? 'text-amber-500' :
                      'text-emerald-500'
                  }`} />
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gap Index</p>
                  <p className="text-2xl font-black text-slate-800">{selectedDistrict.skill_gap_index}/100</p>
                </div>
              </div>

              {/* Top Skills in Demand */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="text-indigo-600" /> Critical Skills in Demand
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedDistrict.top_skills.map((skill: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-800 px-4 py-2 rounded-lg font-bold text-sm">
                      <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                      {skill}
                    </div>
                  ))}
                </div>
                
                {selectedDistrict.skill_gap_index > 50 && (
                  <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
                    <AlertTriangle className="text-amber-600 shrink-0" />
                    <div>
                      <h4 className="font-bold text-amber-900 text-sm">Severe Skill Gap Detected</h4>
                      <p className="text-amber-800 text-sm mt-1">
                        The demand for the above skills far exceeds the current training capacity in {selectedDistrict.name}. 
                        Recommend allocating emergency funds to establish new training modules.
                      </p>
                    </div>
                  </div>
                )}
              </div>

            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 bg-white rounded-xl border border-slate-200 border-dashed">
              <MapIcon size={48} className="mb-4 opacity-50" />
              <p>Select a district to view geographic intelligence.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
