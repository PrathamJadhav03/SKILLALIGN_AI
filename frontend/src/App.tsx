import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import PublicLayout from './components/PublicLayout';
import LandingPage from './pages/public/LandingPage';
import GovernmentLanding from './pages/public/GovernmentLanding';
import EmployerLanding from './pages/public/EmployerLanding';
import InstituteLanding from './pages/public/InstituteLanding';
import CandidateLanding from './pages/public/CandidateLanding';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import ProtectedRoute from './components/ProtectedRoute';
import AppShell from './components/AppShell';

import GovernmentHome from './pages/government/Home';
import EmployerHome from './pages/employer/Home';
import InstituteHome from './pages/institute/Home';
import CandidateHome from './pages/candidate/Home';

import GovernmentDashboard from './pages/government/Dashboard';
import InstituteDashboard from './pages/institute/Dashboard';
import CandidateProfile from './pages/candidate/Profile';
import CandidateAssessments from './pages/candidate/Assessments';
import JobSearch from './pages/candidate/JobSearch';
import JobsManagement from './pages/government/JobsManagement';
import SkillsIntelligence from './pages/government/SkillsIntelligence';
import CoursesManagement from './pages/government/CoursesManagement';
import CandidatesManagement from './pages/government/CandidatesManagement';
import EmployerDashboard from './pages/employer/EmployerDashboard';
import EmployerSurveys from './pages/employer/EmployerSurveys';
import DistrictPlanning from './pages/government/DistrictPlanning';
import ReportingCentre from './pages/government/ReportingCentre';
import Notifications from './pages/system/Notifications';
import Settings from './pages/system/Settings';

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/government" element={<GovernmentLanding />} />
          <Route path="/employer" element={<EmployerLanding />} />
          <Route path="/institute" element={<InstituteLanding />} />
          <Route path="/candidate" element={<CandidateLanding />} />
          
          <Route path="/government/login" element={<Login portalType="government" />} />
          <Route path="/employer/login" element={<Login portalType="employer" />} />
          <Route path="/institute/login" element={<Login portalType="institute" />} />
          <Route path="/candidate/login" element={<Login portalType="candidate" />} />
          <Route path="/login" element={<Navigate to="/candidate/login" replace />} />
          
          <Route path="/register" element={<Register />} />
        </Route>
        
        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppShell />}>
            {/* Authenticated Homes */}
            <Route path="/government/home" element={<GovernmentHome />} />
            <Route path="/employer/home" element={<EmployerHome />} />
            <Route path="/institute/home" element={<InstituteHome />} />
            <Route path="/candidate/home" element={<CandidateHome />} />

            {/* Dashboards and Workspaces */}
            <Route path="/government/dashboard" element={<GovernmentDashboard />} />
            <Route path="/institute/dashboard" element={<InstituteDashboard />} />
            <Route path="/candidate/profile" element={<CandidateProfile />} />
            <Route path="/candidate/dashboard" element={<Navigate to="/candidate/profile" replace />} />
            
            <Route path="/candidate/assessments" element={<CandidateAssessments />} />
            <Route path="/candidate/jobs" element={<JobSearch />} />
            
            <Route path="/employer/dashboard" element={<EmployerDashboard />} />
            <Route path="/employer/surveys" element={<EmployerSurveys />} />
            
            {/* Shared/System routes mapped to their roles in sidebar */}
            <Route path="/jobs" element={<JobsManagement />} />
            <Route path="/skills" element={<SkillsIntelligence />} />
            <Route path="/courses" element={<CoursesManagement />} />
            <Route path="/candidates" element={<CandidatesManagement />} />
            <Route path="/districts" element={<DistrictPlanning />} />
            <Route path="/reports" element={<ReportingCentre />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
