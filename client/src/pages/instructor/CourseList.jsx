import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
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
            } catch (error) {
                console.error(error);
            }
        };
        fetchCourses();
    }, [userInfo.token]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                };
                await axios.delete(`http://localhost:5000/api/courses/${id}`, config);
                setCourses(courses.filter((course) => course.id !== id));
            } catch (error) {
                console.error(error);
                alert('Failed to delete course');
            }
        }
    };

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-6">My Courses</h2>
            <Link to="/instructor/create-course" className="bg-blue-600 text-white px-4 py-2 rounded mb-4 inline-block hover:bg-blue-700">
                Create New Course
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <div key={course.id} className="bg-white p-6 rounded shadow relative">
                        <button
                            onClick={() => handleDelete(course.id)}
                            className="absolute top-4 right-4 text-red-500 hover:text-red-700 font-bold"
                            title="Delete Course"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                        <p className="text-gray-600 mb-4">{course.description.substring(0, 100)}...</p>
                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${course.difficultyLevel === 'Beginner' ? 'bg-green-100 text-green-800' :
                            course.difficultyLevel === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                            }`}>
                            {course.difficultyLevel}
                        </span>
                        <div className="mt-4">
                            <Link to={`/instructor/course/${course.id}`} className="text-blue-600 hover:underline">Manage Content</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseList;
