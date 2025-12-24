import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { AuthProvider, useAuth } from './context/AuthContext'
import CourseList from './CourseList'
import Login1 from './Login1'
import Register1 from './Register1'
import InstructorDashboard from './InstructorDashboard'
import { courseService } from './services/courseService'

const theme = createTheme({
    palette: {
        primary: {
            main: '#4338ca',
        },
        background: {
            default: '#f8fafc',
        },
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: 'soft' },
                    style: {
                        backgroundColor: '#f1f5f9',
                        color: '#475569',
                        '&:hover': {
                            backgroundColor: '#e2e8f0',
                        },
                    },
                },
            ],
        },
    },
})

// Protected Route Component
const ProtectedRoute = ({ children, role }) => {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" />;
    if (role && user.role !== role) return <Navigate to="/" />;
    return children;
};

function AppContent() {
    const [courses, setCourses] = useState([])
    const { user } = useAuth();

    useEffect(() => {
        const fetchCourses = async () => {
            const data = await courseService.getCourses();
            setCourses(data);
        };
        fetchCourses();
    }, []);

    return (
        <Routes>
            <Route path="/login" element={<Login1 />} />
            <Route path="/register" element={<Register1 />} />

            <Route path="/" element={
                user ? (
                    user.role === 'INSTRUCTOR' ? <Navigate to="/instructor/dashboard" /> : <Navigate to="/student/dashboard" />
                ) : <Navigate to="/login" />
            } />

            <Route path="/instructor/dashboard" element={
                <ProtectedRoute role="INSTRUCTOR">
                    <InstructorDashboard courses={courses} />
                </ProtectedRoute>
            } />

            <Route path="/instructor/courses" element={
                <ProtectedRoute role="INSTRUCTOR">
                    <CourseList courses={courses} setCourses={setCourses} />
                </ProtectedRoute>
            } />

            {/* Placeholders for other roles */}
            <Route path="/student/dashboard" element={<ProtectedRoute role="STUDENT"><div>Student Dashboard (Coming Soon)</div></ProtectedRoute>} />
            <Route path="/admin/dashboard" element={<ProtectedRoute role="ADMIN"><div>Admin Dashboard (Coming Soon)</div></ProtectedRoute>} />
            <Route path="/pagenotfound" element={<div>Page Not Found</div>} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <Router>
                    <AppContent />
                </Router>
            </AuthProvider>
        </ThemeProvider>
    )
}

export default App
