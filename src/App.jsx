import { Routes, Route } from 'react-router-dom'
import GetStartedPage from './pages/GetStartedPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import VerifyOtpPage from './pages/auth/VerifyOtpPage'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardPage from './pages/dashboard/DashboardPage'
import TrainerApprovalPage from './pages/trainers/TrainerApprovalPage'
import TrainersPage from './pages/trainers/TrainersPage'
import StudentsPage from './pages/students/StudentsPage'
import CourseApproval from './pages/CourseApproval/CourseApproval'
import FeedbackPage from './pages/feedback/FeedbackPage'
import ComplaintsPage from './pages/complaints/ComplaintsPage'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<GetStartedPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/trainer-approval" element={<ProtectedRoute><TrainerApprovalPage /></ProtectedRoute>} />
        <Route path="/course-approval" element={<ProtectedRoute><CourseApproval /></ProtectedRoute>} />
        <Route path="/trainers" element={<ProtectedRoute><TrainersPage /></ProtectedRoute>} />
        <Route path="/students" element={<ProtectedRoute><StudentsPage /></ProtectedRoute>} />
        <Route path="/feedback" element={<ProtectedRoute><FeedbackPage /></ProtectedRoute>} />
        <Route path="/complaints" element={<ProtectedRoute><ComplaintsPage /></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  )
}

export default App