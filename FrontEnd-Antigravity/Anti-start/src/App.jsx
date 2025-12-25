import React from 'react';
import { createTheme, ThemeProvider, CssBaseline, Box, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CourseList from './CourseList';
import InstructorDashboard from './InstructorDashboard';
import Login1 from './Login1';
import Register1 from './Register1';
import { courseService } from './services/courseService';
import { AuthProvider, useAuth } from './context/AuthContext';


// Create a professional SaaS theme instance
const theme = createTheme({
    palette: {
        primary: {
            main: '#6366f1', // Indigo (Linear/SaaS style)
            light: '#818cf8',
            dark: '#4f46e5',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#64748b', // Slate 500
            light: '#94a3b8',
            dark: '#334155',
            contrastText: '#ffffff',
        },
        background: {
            default: '#f5f7fb', // Soft Gray-Blue Professional Background
            paper: '#ffffff',
        },
        text: {
            primary: '#111827', // Gray 900
            secondary: '#4b5563', // Gray 600
        },
        divider: '#f1f5f9', // Very soft divider
    },
    shape: {
        borderRadius: 12,
    },
    typography: {
        fontFamily: '"Plus Jakarta Sans", "Inter", -apple-system, sans-serif',
        h3: { fontWeight: 800, letterSpacing: '-0.04em', color: '#111827' },
        h5: { fontWeight: 700, letterSpacing: '-0.03em', color: '#111827' },
        h6: { fontWeight: 600, letterSpacing: '-0.02em', color: '#111827' },
        subtitle1: { fontWeight: 600, color: '#111827' },
        body1: { color: '#4b5563', lineHeight: 1.6 },
        button: { textTransform: 'none', fontWeight: 600, borderRadius: 8 },
    },
    shadows: [
        'none',
        '0px 1px 2px rgba(0, 0, 0, 0.05)',
        '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.06)',
        '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
        '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
        ...Array(20).fill('none')
    ],
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#f5f7fb',
                    color: '#111827',
                    scrollbarWidth: 'thin',
                    '&::-webkit-scrollbar': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#e2e8f0',
                        borderRadius: '10px',
                    },
                }
            }
        },
        MuiButton: {
            variants: [
                {
                    props: { variant: 'soft' },
                    style: {
                        backgroundColor: '#f1f5f9',
                        color: '#475569',
                        '&:hover': {
                            backgroundColor: '#e2e8f0',
                        }
                    }
                }
            ],
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    padding: '8px 16px',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        boxShadow: '0px 4px 10px rgba(99, 102, 241, 0.15)',
                        transform: 'translateY(-1px)',
                    },
                },
                containedPrimary: {
                    background: '#6366f1',
                    '&:hover': {
                        background: '#4f46e5',
                    }
                }
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    border: 'none',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                    transition: 'all 0.3s ease',
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                fullWidth: true,
            },
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 10,
                        backgroundColor: '#ffffff',
                        transition: 'all 0.2s ease',
                        '& fieldset': {
                            borderColor: '#e2e8f0',
                            borderWidth: '1.5px',
                        },
                        '&:hover fieldset': {
                            borderColor: '#cbd5e1',
                        },
                        '&.Mui-focused': {
                            '& fieldset': {
                                borderColor: '#6366f1',
                                borderWidth: '2px',
                                boxShadow: '0 0 0 4px rgba(99, 102, 241, 0.1)',
                            }
                        }
                    }
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    borderRadius: 8,
                }
            }
        },
    },
});

const PrivateRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

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
        <ThemeProvider theme={theme} >
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

                        {/* -------- Default -------- */}
                        <Route path="/" element={<Navigate to="/login" replace />} />
                        <Route path="*" element={<Navigate to="/login" replace />} />

                    </Routes>
                </Router>
            </AuthProvider>
        </ThemeProvider >
    );
}

export default App;
