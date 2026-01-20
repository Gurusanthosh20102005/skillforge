import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GenerateQuiz = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [topic, setTopic] = useState('');
    const [difficulty, setDifficulty] = useState('Beginner');
    const [timer, setTimer] = useState(10); // Minutes
    const [activeTab, setActiveTab] = useState('ai'); // 'ai' or 'manual'

    // AI Mode State
    const [numQuestions, setNumQuestions] = useState(5);
    const [loading, setLoading] = useState(false);
    const [generatedQuestions, setGeneratedQuestions] = useState([]);

    // Manual Mode State
    const [manualQuestions, setManualQuestions] = useState([{ question: '', type: 'mcq', options: ['', '', '', ''], answer: '' }]);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                const { data } = await axios.get('http://localhost:5000/api/courses', config);
                setCourses(data);
                if (data.length > 0) {
                    setSelectedCourseId(data[0].id);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        if (userInfo) {
            fetchCourses();
        }
    }, []);

    const handleGenerate = async () => {
        if (!topic) {
            alert('Please enter a topic');
            return;
        }

        setLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const { data } = await axios.post('http://localhost:5000/api/quizzes/generate', {
                topic,
                difficulty,
                numQuestions
            }, config);

            setGeneratedQuestions(data.questions);
        } catch (error) {
            console.error('Error generating quiz:', error);
            alert('Failed to generate quiz. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!selectedCourseId) {
            alert('Please select a course');
            return;
        }

        const questionsToSave = activeTab === 'ai' ? generatedQuestions : manualQuestions;

        if (questionsToSave.length === 0) {
            alert('No questions to save');
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            await axios.post('http://localhost:5000/api/quizzes', {
                courseId: selectedCourseId,
                topic,
                difficulty,
                timer,
                questions: questionsToSave
            }, config);

            alert('Quiz saved successfully!');
            navigate('/instructor/courses');
        } catch (error) {
            console.error('Error saving quiz:', error);
            alert('Failed to save quiz.');
        }
    };

    const addQuestion = () => {
        setManualQuestions([...manualQuestions, { question: '', type: 'mcq', options: ['', '', '', ''], answer: '' }]);
    };

    const deleteQuestion = (index) => {
        const updated = manualQuestions.filter((_, i) => i !== index);
        setManualQuestions(updated);
    };

    const updateQuestion = (index, field, value) => {
        const updated = [...manualQuestions];
        updated[index][field] = value;
        setManualQuestions(updated);
    };

    const updateOption = (qIndex, oIndex, value) => {
        const updated = [...manualQuestions];
        updated[qIndex].options[oIndex] = value;
        setManualQuestions(updated);
    };

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Create Quiz</h2>

            {/* Tabs */}
            <div className="flex mb-6 border-b">
                <button
                    className={`px-6 py-2 font-bold ${activeTab === 'ai' ? 'border-b-4 border-purple-600 text-purple-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('ai')}
                >
                    AI Generator
                </button>
                <button
                    className={`px-6 py-2 font-bold ${activeTab === 'manual' ? 'border-b-4 border-purple-600 text-purple-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('manual')}
                >
                    Manual Creation
                </button>
            </div>

            <div className="bg-white p-6 rounded shadow mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Course</label>
                        <select
                            value={selectedCourseId}
                            onChange={(e) => setSelectedCourseId(e.target.value)}
                            className="w-full border p-2 rounded"
                        >
                            <option value="">Select Course</option>
                            {courses.map(c => (
                                <option key={c.id} value={c.id}>{c.title}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Difficulty</label>
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            className="w-full border p-2 rounded"
                        >
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Timer (Minutes)</label>
                        <input
                            type="number"
                            value={timer}
                            onChange={(e) => setTimer(e.target.value)}
                            className="w-full border p-2 rounded"
                            min="1"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Topic</label>
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full border p-2 rounded"
                        placeholder="e.g. React Hooks"
                        required
                    />
                </div>

                {activeTab === 'ai' && (
                    <>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Number of Questions</label>
                            <input
                                type="number"
                                value={numQuestions}
                                onChange={(e) => setNumQuestions(e.target.value)}
                                className="w-full border p-2 rounded"
                                min="1"
                                max="10"
                            />
                        </div>
                        <button
                            onClick={handleGenerate}
                            disabled={loading}
                            className={`w-full text-white font-bold py-2 rounded ${loading ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'}`}
                        >
                            {loading ? 'Generating...' : 'Generate Questions with AI'}
                        </button>
                    </>
                )}

                {activeTab === 'manual' && (
                    <div className="space-y-6 mt-6">
                        {manualQuestions.map((q, qIndex) => (
                            <div key={qIndex} className="p-4 border rounded bg-gray-50 relative">
                                <button
                                    onClick={() => deleteQuestion(qIndex)}
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                    title="Delete Question"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                <h4 className="font-bold mb-2">Question {qIndex + 1}</h4>

                                <div className="flex gap-4 mb-3">
                                    <div className="flex-grow">
                                        <input
                                            className="w-full border p-2 rounded"
                                            placeholder="Enter question text"
                                            value={q.question}
                                            onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <select
                                            className="border p-2 rounded"
                                            value={q.type}
                                            onChange={(e) => updateQuestion(qIndex, 'type', e.target.value)}
                                        >
                                            <option value="mcq">MCQ</option>
                                            <option value="short">Short Answer</option>
                                        </select>
                                    </div>
                                </div>

                                {q.type === 'mcq' ? (
                                    <>
                                        <div className="grid grid-cols-2 gap-2 mb-3">
                                            {q.options.map((opt, oIndex) => (
                                                <input
                                                    key={oIndex}
                                                    className="border p-2 rounded"
                                                    placeholder={`Option ${oIndex + 1}`}
                                                    value={opt}
                                                    onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                                                />
                                            ))}
                                        </div>
                                        <select
                                            className="w-full border p-2 rounded"
                                            value={q.answer}
                                            onChange={(e) => updateQuestion(qIndex, 'answer', e.target.value)}
                                        >
                                            <option value="">Select Correct Answer</option>
                                            {q.options.map((opt, i) => (
                                                opt && <option key={i} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </>
                                ) : (
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">Correct Answer (Exact Match)</label>
                                        <input
                                            className="w-full border p-2 rounded"
                                            placeholder="Enter the correct short answer"
                                            value={q.answer}
                                            onChange={(e) => updateQuestion(qIndex, 'answer', e.target.value)}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                        <button
                            onClick={addQuestion}
                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                        >
                            + Add Question
                        </button>

                        <button
                            onClick={handleSave}
                            className="w-full mt-6 bg-green-600 text-white font-bold py-3 rounded hover:bg-green-700"
                        >
                            Save Manual Quiz
                        </button>
                    </div>
                )}
            </div>

            {/* AI Preview Section */}
            {activeTab === 'ai' && generatedQuestions.length > 0 && (
                <div className="bg-white p-6 rounded shadow">
                    <h3 className="text-xl font-bold mb-4">Preview AI Quiz</h3>
                    {generatedQuestions.map((q, idx) => (
                        <div key={idx} className="mb-6 border-b pb-4 last:border-0">
                            <p className="font-semibold mb-2">{idx + 1}. {q.question}</p>
                            <ul className="list-disc pl-5">
                                {q.options.map((opt, i) => (
                                    <li key={i} className={opt === q.answer ? 'text-green-600 font-bold' : ''}>
                                        {opt}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <button
                        onClick={handleSave}
                        className="bg-green-600 text-white font-bold py-2 px-6 rounded hover:bg-green-700"
                    >
                        Save AI Quiz
                    </button>
                </div>
            )}
        </div>
    );
};

export default GenerateQuiz;
