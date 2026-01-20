import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const StudentDashboard = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [adaptiveSuggestion, setAdaptiveSuggestion] = useState(null);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                };
                const enrollRes = await axios.get('http://localhost:5000/api/student/dashboard', config);
                const recRes = await axios.get('http://localhost:5000/api/student/recommendations', config);
                const suggRes = await axios.get('http://localhost:5000/api/quizzes/suggestions', config);

                setEnrollments(enrollRes.data);
                setRecommendations(recRes.data);
                setAdaptiveSuggestion(suggRes.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [userInfo.token]);

    const handleEnroll = async (courseId) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            };
            await axios.post(`http://localhost:5000/api/student/enroll/${courseId}`, {}, config);
            alert('Enrolled successfully!');
            // Refresh
            const enrollRes = await axios.get('http://localhost:5000/api/student/dashboard', config);
            setEnrollments(enrollRes.data);
        } catch (error) {
            console.error(error);
            alert('Enrollment failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-body">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Adaptive Learning Section */}
                {adaptiveSuggestion && (
                    <section className="mb-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">My Learning Path</h3>
                                <p className="text-purple-100 text-lg mb-4">{adaptiveSuggestion.suggestion?.text}</p>

                                {adaptiveSuggestion.recentPerformance !== undefined && (
                                    <div className="w-full max-w-md bg-white/20 rounded-full h-4 mb-2">
                                        <div
                                            className="h-4 rounded-full bg-green-400 transition-all duration-1000"
                                            style={{ width: `${adaptiveSuggestion.recentPerformance}%` }}
                                        ></div>
                                        <p className="text-xs mt-1 text-purple-200">Recent Accuracy: {adaptiveSuggestion.recentPerformance.toFixed(0)}%</p>
                                    </div>
                                )}
                            </div>

                            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20 min-w-[250px] text-center">
                                <p className="text-sm font-semibold text-purple-200 uppercase mb-1">Recommended Mode</p>
                                <p className="text-3xl font-bold mb-3">{adaptiveSuggestion.suggestion?.recommendedDifficulty || 'Loading...'}</p>
                                <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-bold hover:bg-purple-50 transition w-full">
                                    {adaptiveSuggestion.suggestion?.nextAction || 'Start Learning'}
                                </button>
                            </div>
                        </div>
                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-purple-500/30 rounded-full blur-2xl"></div>
                    </section>
                )}

                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-heading font-bold text-gray-900">Enrolled Courses</h2>
                        <p className="text-gray-500 mt-1">Continue where you left off</p>
                    </div>
                </div>

                <section className="mb-12">
                    {enrollments.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                            <p className="text-gray-500 mb-4">You are not enrolled in any courses yet.</p>
                            <button className="text-primary-600 font-semibold hover:underline">Browse Catalog</button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {enrollments.map((enrollment) => (
                                <div key={enrollment.id} className="glass p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300 group">
                                    <div className="flex justify-between items-start mb-4">
                                        <h4 className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-primary-600 transition-colors">{enrollment.Course.title}</h4>
                                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${enrollment.Course.difficultyLevel === 'Beginner' ? 'bg-green-50 text-green-700 border-green-200' :
                                            enrollment.Course.difficultyLevel === 'Intermediate' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                                'bg-red-50 text-red-700 border-red-200'
                                            }`}>
                                            {enrollment.Course.difficultyLevel}
                                        </span>
                                    </div>

                                    <div className="mb-6">
                                        <div className="flex justify-between text-xs font-medium text-gray-500 mb-2">
                                            <span>Progress</span>
                                            <span>{enrollment.progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full transition-all duration-1000 ${enrollment.progress < 30 ? 'bg-red-500' :
                                                    enrollment.progress < 70 ? 'bg-yellow-500' :
                                                        'bg-gradient-to-r from-green-400 to-emerald-500'
                                                    }`}
                                                style={{ width: `${enrollment.progress}%` }}>
                                            </div>
                                        </div>
                                    </div>
                                    <Link to={`/student/course/${enrollment.courseId}`} className="block w-full text-center bg-gray-50 hover:bg-primary-50 text-gray-700 hover:text-primary-700 border border-gray-200 hover:border-primary-200 py-2 rounded-lg text-sm font-medium transition-colors">
                                        Continue Learning
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <section>
                    <h3 className="text-2xl font-heading font-bold text-gray-900 mb-6">Recommended for You</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recommendations.map((course) => (
                            <div key={course.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-400 to-indigo-500"></div>
                                <h4 className="text-lg font-bold text-gray-800 mb-2">{course.title}</h4>
                                <p className="text-gray-500 mb-4 text-sm line-clamp-2">{course.description}</p>
                                <div className="flex justify-between items-center mt-auto">
                                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{course.difficultyLevel}</span>
                                    <button
                                        onClick={() => handleEnroll(course.id)}
                                        className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                                    >
                                        Enroll Now
                                    </button>
                                </div>
                            </div>
                        ))}
                        {recommendations.length === 0 && (
                            <div className="col-span-full text-center py-8 text-gray-400 italic">
                                No new recommendations at this time.
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default StudentDashboard;
