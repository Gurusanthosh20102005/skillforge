import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 font-body">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-heading font-bold text-gray-900">Dashboard</h2>
                    <p className="text-gray-500 mt-1">Welcome back, get ready to learn something new today.</p>
                </div>

                {userInfo?.role === 'student' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Student Progress Card */}
                        <div className="glass p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-gray-800">My Progress</h3>
                                <span className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                </span>
                            </div>
                            <p className="text-gray-600 mb-6 text-sm">Track your learning journey and extensive growth.</p>

                            <div className="space-y-4">
                                <div className="w-full bg-gray-100 rounded-full h-2.5">
                                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.3)]" style={{ width: '45%' }}></div>
                                </div>
                                <div className="flex gap-3 mt-4">
                                    <button onClick={() => navigate('/student/dashboard')} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-lg shadow-blue-500/30">
                                        Learning
                                    </button>
                                    <button onClick={() => navigate('/student/analytics')} className="flex-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition">
                                        Performance
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Adaptive Quiz Card */}
                        <div className="glass p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-gray-800">Adaptive Quiz</h3>
                                <span className="p-2 bg-green-50 text-green-600 rounded-lg">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </span>
                            </div>
                            <p className="text-gray-600 mb-6 text-sm">Take a quiz tailored to your skill level and improve faster.</p>
                            <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-teal-500/30 transition-all">
                                Start Quiz
                            </button>
                        </div>
                    </div>
                )}

                {userInfo?.role === 'instructor' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Manage Courses Card */}
                        <div className="glass p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300 border-l-4 border-l-blue-500">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-gray-800">Manage Courses</h3>
                                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                            </div>
                            <p className="text-gray-600 mb-6 text-sm">Upload new content, edit syllabus, and manage your course catalog.</p>
                            <button onClick={() => navigate('/instructor/courses')} className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-500/20">
                                Go to Courses
                            </button>
                        </div>

                        {/* Student Analytics Card */}
                        <div className="glass p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300 border-l-4 border-l-purple-500">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-gray-800">Analytics</h3>
                                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                            </div>
                            <p className="text-gray-600 mb-6 text-sm">Monitor student performance and generate assessment reports.</p>
                            <div className="flex flex-col gap-2">
                                <button onClick={() => navigate('/instructor/generate-quiz')} className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition shadow-lg shadow-purple-500/20">
                                    Generate Quiz
                                </button>
                                <button onClick={() => navigate('/instructor/analytics')} className="w-full bg-white border border-purple-200 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition">
                                    View Reports
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {userInfo?.role === 'admin' && (
                    <div className="glass p-6 rounded-2xl border-l-4 border-l-gray-800">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-800">System Administration</h3>
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        </div>
                        <p className="text-gray-600">Manage users, system usage, and settings.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
