import React from 'react';
import { createTheme, ThemeProvider, CssBaseline, Box, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CourseList from './CourseList';
import InstructorDashboard from './InstructorDashboard';
import Login1 from './Login1';
import Register1 from './Register1';
import { courseService } from './services/courseService';
import { AuthProvider, useAuth } from './context/AuthContext';

// ------------------- THEME -------------------
const theme = createTheme({
    palette: {
        primary: { main: '#6366f1', light: '#818cf8', dark: '#4f46e5', contrastText: '#ffffff' },
        secondary: { main: '#64748b', light: '#94a3b8', dark: '#334155', contrastText: '#ffffff' },
        background: { default: '#f5f7fb', paper: '#ffffff' },
        text: { primary: '#111827', secondary: '#4b5563' },
        divider: '#f1f5f9',
    },
    shape: { borderRadius: 12 },
    typography: { fontFamily: '"Plus Jakarta Sans", "Inter", -apple-system, sans-serif' },
});

// ------------------- PRIVATE ROUTE -------------------
const PrivateRoute = ({ children, allowedRoles }) => {
    const { user } = useAuth();
    const isAuthenticated = !!user?.token; // check if token exists

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user?.role?.toUpperCase())) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

// ------------------- APP -------------------
function App() {
    const [courses, setCourses] = React.useState([]);

    React.useEffect(() => {
        const fetchInitialData = async () => {
            const data = await courseService.getCourses();
            setCourses(data);
        };
        fetchInitialData();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <Router>
                    <Routes>
                        {/* -------- Public -------- */}
                        <Route path="/register" element={<Register1 />} />
                        <Route path="/login" element={<Login1 />} />

                        {/* -------- Student -------- */}
                        <Route
                            path="/student/dashboard"
                            element={
                                <PrivateRoute allowedRoles={['STUDENT']}>
                                    <Box p={4}><Typography variant="h4">Student Dashboard (Coming Soon)</Typography></Box>
                                </PrivateRoute>
                            }
                        />

                        {/* -------- Instructor -------- */}
                        <Route
                            path="/instructor/dashboard"
                            element={
                                <PrivateRoute allowedRoles={['INSTRUCTOR']}>
                                    <InstructorDashboard courses={courses} />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/instructor/courses"
                            element={
                                <PrivateRoute allowedRoles={['INSTRUCTOR']}>
                                    <CourseList courses={courses} setCourses={setCourses} />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/instructor/status"
                            element={
                                <PrivateRoute allowedRoles={['INSTRUCTOR']}>
                                    <Box p={4}><Typography variant="h4">Course Status (Coming Soon)</Typography></Box>
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/instructor/announce"
                            element={
                                <PrivateRoute allowedRoles={['INSTRUCTOR']}>
                                    <Box p={4}><Typography variant="h4">Announcements (Coming Soon)</Typography></Box>
                                </PrivateRoute>
                            }
                        />

                        {/* -------- Admin -------- */}
                        <Route
                            path="/admin/dashboard"
                            element={
                                <PrivateRoute allowedRoles={['ADMIN']}>
                                    <Box p={4}><Typography variant="h4">Admin Dashboard (Coming Soon)</Typography></Box>
                                </PrivateRoute>
                            }
                        />
                        {/* -------- Default / Not Found -------- */}
                        <Route path="/" element={<Navigate to="/login" replace />} />
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
}
export default App;
