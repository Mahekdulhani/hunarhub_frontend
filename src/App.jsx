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
        <Route path="/trainers" element={<ProtectedRoute><TrainersPage /></ProtectedRoute>} />
        <Route path="/students" element={<ProtectedRoute><StudentsPage /></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  )
}

export default App
