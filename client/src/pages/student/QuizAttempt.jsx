import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const QuizAttempt = () => {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null); // Seconds
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                };
                const { data } = await axios.get(`http://localhost:5000/api/quizzes/${id}`, config);
                setQuiz(data);
                // Initialize timer if exists
                if (data.timer) {
                    setTimeLeft(data.timer * 60);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchQuiz();
    }, [id, userInfo.token]);

    // Timer Logic
    useEffect(() => {
        if (timeLeft === null || result) return;

        if (timeLeft === 0) {
            alert("Time's up! Submitting your quiz.");
            handleSubmit();
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft, result]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleOptionSelect = (questionIndex, option) => {
        setAnswers({ ...answers, [questionIndex]: option });
    };

    const handleSubmit = async () => {
        if (!quiz) return;
        const answersArray = quiz.questions.map((_, index) => answers[index] || null);

        try {
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            };
            const { data } = await axios.post(`http://localhost:5000/api/quizzes/${id}/submit`, {
                answers: answersArray
            }, config);

            setResult(data);
            setTimeLeft(null); // Stop timer
        } catch (error) {
            console.error(error);
            alert('Failed to submit quiz');
        }
    };

    if (!quiz) return <div className="p-8">Loading Quiz...</div>;

    if (result) {
        return (
            <div className="p-8 max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">Quiz Results</h2>
                <div className="bg-white p-8 rounded shadow">
                    <p className="text-xl mb-4">You scored:</p>
                    <p className="text-5xl font-bold text-blue-600 mb-6">
                        {result.score} / {result.totalQuestions}
                    </p>
                    <div className="mb-6">
                        <span className={`px-4 py-2 rounded-full text-white font-bold ${(result.score / result.totalQuestions) >= 0.6 ? 'bg-green-500' : 'bg-red-500'
                            }`}>
                            {(result.score / result.totalQuestions) >= 0.6 ? 'Passed' : 'Needs Improvement'}
                        </span>
                    </div>
                    <button
                        onClick={() => navigate('/student/dashboard')}
                        className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-3xl mx-auto relative">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{quiz.topic} Quiz</h2>
                {timeLeft !== null && (
                    <div className={`text-xl font-mono font-bold px-4 py-2 rounded ${timeLeft < 60 ? 'bg-red-100 text-red-600' : 'bg-gray-100'}`}>
                        Time Left: {formatTime(timeLeft)}
                    </div>
                )}
            </div>

            <p className="text-gray-500 mb-8">Answer all questions below.</p>

            {quiz.questions.map((q, index) => (
                <div key={index} className="bg-white p-6 rounded shadow mb-6">
                    <p className="font-semibold text-lg mb-4">{index + 1}. {q.question}</p>
                    <div className="space-y-2">
                        {q.type === 'short' ? (
                            <input
                                type="text"
                                placeholder="Type your answer here..."
                                value={answers[index] || ''}
                                onChange={(e) => handleOptionSelect(index, e.target.value)}
                                className="w-full border p-3 rounded focus:outline-none focus:border-purple-500"
                            />
                        ) : (
                            q.options.map((option, optIndex) => (
                                <label key={optIndex} className="flex items-center space-x-3 cursor-pointer p-3 border rounded hover:bg-purple-50 hover:border-purple-200 transition-colors">
                                    <input
                                        type="radio"
                                        name={`question-${index}`}
                                        value={option}
                                        checked={answers[index] === option}
                                        onChange={() => handleOptionSelect(index, option)}
                                        className="form-radio h-5 w-5 text-purple-600"
                                    />
                                    <span className="text-gray-800">{option}</span>
                                </label>
                            ))
                        )}
                    </div>
                </div>
            ))}

            <button
                onClick={handleSubmit}
                className="w-full bg-green-600 text-white font-bold py-3 rounded hover:bg-green-700 shadow-lg text-lg"
            >
                Submit Quiz
            </button>
        </div>
    );
};

export default QuizAttempt;
