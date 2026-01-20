import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InstructorAnalytics = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                };
                const { data } = await axios.get('http://localhost:5000/api/analytics/instructor', config);
                setStats(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <div className="p-8 text-center text-gray-500">Loading Analytics...</div>;
    if (!stats) return <div className="p-8 text-center text-red-500">Failed to load data.</div>;

    const { enrollmentData, quizPerformance, detailedResults } = stats;

    const quizChartData = {
        labels: quizPerformance.map(q => q.title),
        datasets: [
            {
                label: 'Average Score (%)',
                data: quizPerformance.map(q => q.average),
                backgroundColor: 'rgba(124, 58, 237, 0.6)',
                borderColor: 'rgba(124, 58, 237, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Course & Student Analytics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Quiz Performance Chart */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-4 text-gray-700">Quiz Performance by Topic</h3>
                    {quizPerformance.length > 0 ? (
                        <Bar data={quizChartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
                    ) : (
                        <p className="text-gray-500">No quiz data available.</p>
                    )}
                </div>

                {/* Enrollment Summary */}
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center">
                    <h3 className="text-xl font-bold mb-4 text-gray-700">Enrollment Overview</h3>
                    <div className="space-y-4">
                        {enrollmentData.map((course, idx) => (
                            <div key={idx} className="flex justify-between items-center border-b pb-2">
                                <span className="font-semibold">{course.title}</span>
                                <span className="text-purple-600 font-bold text-xl">{course.students} Students</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Detailed Student Results Table */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-6 text-gray-700">Detailed Student Results</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Student ID
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Student Name
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Quiz Topic
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Score
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    %
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {detailedResults && detailedResults.map((result, idx) => (
                                <tr key={idx}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{result.studentId}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap font-semibold">{result.studentName}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{result.quizTopic}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{result.score} / {result.total}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${result.percentage >= 60 ? 'text-green-900' : 'text-red-900'}`}>
                                            <span aria-hidden className={`absolute inset-0 opacity-50 rounded-full ${result.percentage >= 60 ? 'bg-green-200' : 'bg-red-200'}`}></span>
                                            <span className="relative">{result.percentage}%</span>
                                        </span>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{new Date(result.date).toLocaleDateString()}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InstructorAnalytics;
