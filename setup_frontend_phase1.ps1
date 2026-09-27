$directories = @(
    "src/components/ui",
    "src/components/layout",
    "src/pages/auth",
    "src/pages/government",
    "src/pages/employer",
    "src/pages/institute",
    "src/pages/candidate",
    "src/services",
    "src/utils"
)

foreach ($dir in $directories) {
    New-Item -ItemType Directory -Force -Path "frontend/$dir" | Out-Null
}

$apiService = @"
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = \`Bearer \` + token;
  }
  return config;
});

export default api;
"@
Set-Content -Path "frontend/src/services/api.ts" -Value $apiService

$loginPage = @"
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);
      
      const res = await api.post('/auth/login', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      localStorage.setItem('token', res.data.access_token);
      // For prototype, simply route to government dashboard
      navigate('/government/dashboard');
    } catch (err) {
      alert('Login failed. For demo, ensure user exists.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white rounded shadow-md w-96">
        <h2 className="mb-6 text-2xl font-bold text-center">SkillAlign AI Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-6">
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border rounded" required />
          </div>
          <button type="submit" className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700">Login</button>
        </form>
      </div>
    </div>
  );
}
"@
Set-Content -Path "frontend/src/pages/auth/Login.tsx" -Value $loginPage

$govDashboard = @"
import React from 'react';

export default function GovernmentDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Government Portal</h1>
      <p>Welcome to the Labour Intelligence Dashboard.</p>
    </div>
  );
}
"@
Set-Content -Path "frontend/src/pages/government/Dashboard.tsx" -Value $govDashboard

$appTsx = @"
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import GovernmentDashboard from './pages/government/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/government/dashboard" element={<GovernmentDashboard />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
"@
Set-Content -Path "frontend/src/App.tsx" -Value $appTsx
