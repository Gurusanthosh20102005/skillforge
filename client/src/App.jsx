import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import CourseList from './pages/instructor/CourseList';
import CreateCourse from './pages/instructor/CreateCourse';
import ManageCourse from './pages/instructor/ManageCourse';
import GenerateQuiz from './pages/instructor/GenerateQuiz';
import StudentDashboard from './pages/student/StudentDashboard';
import CourseView from './pages/student/CourseView';
import QuizAttempt from './pages/student/QuizAttempt';
import InstructorAnalytics from './pages/instructor/InstructorAnalytics';
import StudentAnalytics from './pages/student/StudentAnalytics';
import './App.css';

import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route element={<ProtectedRoute allowedRoles={['instructor']} />}>
              <Route path="/instructor/courses" element={<CourseList />} />
              <Route path="/instructor/create-course" element={<CreateCourse />} />
              <Route path="/instructor/course/:id" element={<ManageCourse />} />
              <Route path="/instructor/generate-quiz" element={<GenerateQuiz />} />
              <Route path="/instructor/analytics" element={<InstructorAnalytics />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['student']} />}>
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/course/:id" element={<CourseView />} />
              <Route path="/student/quiz/:id" element={<QuizAttempt />} />
              <Route path="/student/analytics" element={<StudentAnalytics />} />
            </Route>
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}


export default App;
