import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CourseView = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [quizzes, setQuizzes] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                };
                const courseRes = await axios.get(`http://localhost:5000/api/courses/${id}`, config);
                const quizRes = await axios.get(`http://localhost:5000/api/quizzes/course/${id}`, config);

                setCourse(courseRes.data);
                setQuizzes(quizRes.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCourseData();
    }, [id, userInfo.token]);

    const markComplete = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            };
            await axios.put(`http://localhost:5000/api/student/progress/${id}`, {
                progress: 100,
                completed: true
            }, config);
            alert('Course marked as complete!');
            setProgress(100);
        } catch (error) {
            console.error(error);
        }
    }

    if (!course) return <div>Loading...</div>;

    return (
        <div className="p-8">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-3xl font-bold">{course.title}</h2>
                    <p className="text-gray-600 mt-2">{course.description}</p>
                </div>
                <button
                    onClick={markComplete}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Mark as Complete
                </button>
            </div>

            <div className="space-y-6">
                {course.Contents?.map((content) => (
                    <div key={content.id} className="bg-white p-6 rounded shadow">
                        <h3 className="text-xl font-bold mb-2">{content.title} <span className="text-sm font-normal text-gray-500">({content.type})</span></h3>

                        {content.type === 'video' && content.url.startsWith('/uploads') && (
                            <video controls className="w-full max-w-2xl mt-4 rounded">
                                <source src={`http://localhost:5000${content.url}`} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}

                        {(content.type === 'pdf' || content.type === 'link') && (
                            <a
                                href={content.url.startsWith('/uploads') ? `http://localhost:5000${content.url}` : content.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline mt-2 inline-block"
                            >
                                {content.type === 'pdf' ? 'Download/View PDF' : 'Visit Link'}
                            </a>
                        )}
                    </div>
                ))}
                {(!course.Contents || course.Contents.length === 0) && <p>No content uploaded for this course yet.</p>}
            </div>

            <div className="mt-12">
                <h3 className="text-2xl font-bold mb-4">Quizzes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quizzes.map((quiz) => (
                        <div key={quiz.id} className="bg-purple-50 p-6 rounded shadow border border-purple-200">
                            <h4 className="text-xl font-bold mb-2">{quiz.topic}</h4>
                            <a
                                href={`/student/quiz/${quiz.id}`}
                                className="inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                            >
                                Take Quiz
                            </a>
                        </div>
                    ))}
                    {quizzes.length === 0 && <p>No quizzes available for this course.</p>}
                </div>
            </div>
        </div>
    );
};

export default CourseView;
