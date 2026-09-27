import { useEffect, useState } from 'react';
import { Award, PlayCircle, CheckCircle } from 'lucide-react';
import api from '../../services/api';

interface Assessment {
  id: number;
  title: string;
  passing_score: number;
}

export default function CandidateAssessments() {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [takingId, setTakingId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get('/assessments/');
        setAssessments(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleTakeAssessment = async (id: number) => {
    setTakingId(id);
    try {
      // Mocking a passing score for demonstration purposes
      await api.post('/assessments/take', {
        candidate_id: 1, // Mock user
        assessment_id: id,
        score: 85.0
      });
      alert('Assessment Passed! Skill has been verified and badge awarded.');
    } catch (err) {
      alert('Failed to take assessment.');
    } finally {
      setTakingId(null);
    }
  };

  if (loading) return <div className="p-10">Loading Assessments...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-10">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
          <Award className="text-indigo-600" size={32} />
          Assessment Center
        </h1>
        <p className="text-slate-500 mt-2">Take skill assessments to earn verified badges on your profile.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        {assessments.map(a => (
          <div key={a.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{a.title}</h3>
              <p className="text-sm text-slate-500 mb-6">Required passing score: {a.passing_score}%</p>
            </div>
            
            <button 
              onClick={() => handleTakeAssessment(a.id)}
              disabled={takingId === a.id}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
            >
              {takingId === a.id ? 'Processing...' : (
                <>
                  <PlayCircle size={18} />
                  Start Assessment
                </>
              )}
            </button>
          </div>
        ))}
        {assessments.length === 0 && <p className="col-span-full text-slate-500">No assessments available.</p>}
      </div>
    </div>
  );
}
