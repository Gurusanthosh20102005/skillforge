import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const StudentAnalytics = () => {
    const [stats, setStats] = useState(null);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                };
                const { data } = await axios.get('http://localhost:5000/api/analytics/student', config);
                setStats(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchStats();
    }, [userInfo.token]);

    if (!stats) return <div className="p-8">Loading Analytics...</div>;

    const progressData = {
        labels: stats.progressData.map(d => d.course),
        datasets: [
            {
                label: 'Course Progress (%)',
                data: stats.progressData.map(d => d.progress),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
        ],
    };

    const quizData = {
        labels: stats.quizScores.map(d => d.quiz),
        datasets: [
            {
                label: 'Quiz Scores (%)',
                data: stats.quizScores.map(d => d.score),
                backgroundColor: 'rgba(153, 102, 255, 0.5)',
            }
        ]
    };

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-6">My Performance</h2>

            <div className="space-y-8">
                <div className="bg-white p-6 rounded shadow">
                    <h3 className="text-xl font-bold mb-4">Learning Progress</h3>
                    <Line options={{ responsive: true }} data={progressData} />
                </div>

                <div className="bg-white p-6 rounded shadow">
                    <h3 className="text-xl font-bold mb-4">Recent Quiz Scores</h3>
                    <Bar options={{ responsive: true }} data={quizData} />
                </div>
            </div>
        </div>
    );
};

export default StudentAnalytics;
