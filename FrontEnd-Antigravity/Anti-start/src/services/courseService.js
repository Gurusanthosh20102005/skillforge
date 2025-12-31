/**
 * courseService.js
 * 
 * This service abstracts the data operations for courses.
 * It is currently backed by localStorage to preserve functionality,
 * but it uses the naming convention from the SQL database schema
 * (course_id, course_title, instructor_id, etc.) so it can be 
 * easily connected to a real backend.
 */

const STORAGE_KEY = 'skillforge_courses';

// Initialize with some mock data if empty
const initialData = [
    {
        course_id: 1,
        instructor_id: 101,
        course_title: "Fullstack Web Development",
        description: "Master modern web development from frontend to backend.",
        difficulty: "INTERMEDIATE",
        topics: []
    }
];

const getStoredCourses = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
        return initialData;
    }
    return JSON.parse(data);
};

const saveStoredCourses = (courses) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
};

export const courseService = {
    /**
     * Fetch all courses from the "backend"
     */
    async getCourses() {
        // Simulate network delay
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(getStoredCourses());
            }, 300);
        });
    },

    /**
     * Save a course (Create or Update)
     */
    async saveCourse(course, isUpdate) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const courses = getStoredCourses();
                let updatedCourses;

                if (isUpdate) {
                    // Update existing
                    updatedCourses = courses.map(c =>
                        // We use editingId or similar? 
                        // Actually, if we are updating, course.course_id is the existing one.
                        c.course_id === course.course_id ? { ...c, ...course } : c
                    );
                } else {
                    // Create new
                    const newCourse = {
                        ...course,
                        // If course.course_id is a string from user, we use it, 
                        // but normally it would be numeric for AI PK.
                        // We'll keep it as is for now as per user structure.
                        created_at: new Date().toISOString(),
                        topics: []
                    };
                    updatedCourses = [...courses, newCourse];
                }

                saveStoredCourses(updatedCourses);
                resolve(updatedCourses);
            }, 300);
        });
    },

    /**
     * Delete a course
     */
    async deleteCourse(course_id) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const courses = getStoredCourses();
                const updatedCourses = courses.filter(c => c.course_id !== course_id);
                saveStoredCourses(updatedCourses);
                resolve(updatedCourses);
            }, 300);
        });
    },

    /**
     * Add or update a topic in a course
     */
    async saveTopic(course_id, topicIndex, topic) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const courses = getStoredCourses();
                const updatedCourses = courses.map(c => {
                    if (c.course_id === course_id) {
                        const topics = [...c.topics];
                        if (topicIndex !== null && topicIndex !== undefined && topicIndex >= 0) {
                            topics[topicIndex] = { ...topics[topicIndex], ...topic };
                        } else {
                            topics.push({ ...topic, materials: [] });
                        }
                        return { ...c, topics };
                    }
                    return c;
                });
                saveStoredCourses(updatedCourses);
                resolve(updatedCourses);
            }, 300);
        });
    },

    /**
     * Add material to a topic
     */
    async addMaterial(course_id, topicIndex, material) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const courses = getStoredCourses();
                const updatedCourses = courses.map(c => {
                    if (c.course_id === course_id) {
                        const topics = [...c.topics];
                        topics[topicIndex].materials.push(material);
                        return { ...c, topics };
                    }
                    return c;
                });
                saveStoredCourses(updatedCourses);
                resolve(updatedCourses);
            }, 300);
        });
    }
};
/**
 * courseService.js
 *
 * This service now interacts with the real Spring Boot backend
 * instead of using localStorage.
//  */
// // ----------------- courseService.js -----------------
// const API_BASE_URL = "http://localhost:8081/api/courses";

// export const courseService = {
//     async saveCourse(course, isUpdate) {
//         const token = localStorage.getItem("token"); // JWT from localStorage
//         const method = isUpdate ? "PUT" : "POST";
//         const url = isUpdate
//             ? `${API_BASE_URL}/${course.course_id}` // PUT endpoint
//             : API_BASE_URL;                        // POST endpoint

//         const response = await fetch(url, {
//             method,
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`
//             },
//             body: JSON.stringify(course)
//         });

//         if (!response.ok) {
//             const errorText = await response.text();
//             console.error("Backend error response:", errorText);
//             throw new Error("Failed to save course");
//         }

//         return await response.json();
//     },

//     // ... other methods remain the same
// };
