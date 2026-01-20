import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const QuizList = () => {
    // This could be mounted on a Course Management page, or standalone.
    // For simplicity, let's assume we fetch quizzes for a specific course or list all created by instructor.
    // Let's implement lists by selected course from the CourseList page.
    return (
        <div className="p-8">
            <h2 className="text-2xl">Quiz Management</h2>
            <p>Select a course to view quizzes.</p>
        </div>
    )
};

export default QuizList;
