import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ManageCourse = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [contentTitle, setContentTitle] = useState('');
    const [contentType, setContentType] = useState('video');
    const [contentUrl, setContentUrl] = useState('');
    const [file, setFile] = useState(null);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                };
                const { data } = await axios.get(`http://localhost:5000/api/courses/${id}`, config);
                setCourse(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCourse();
    }, [id, userInfo.token]);

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', contentTitle);
        formData.append('type', contentType);
        if (file) formData.append('file', file);
        if (contentUrl) formData.append('url', contentUrl);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            await axios.post(`http://localhost:5000/api/courses/${id}/content`, formData, config);
            alert('Content added successfully');
            // Refresh course data
            const { data } = await axios.get(`http://localhost:5000/api/courses/${id}`, {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            });
            setCourse(data);
        } catch (error) {
            console.error(error);
            alert('Failed to upload content');
        }
    };

    if (!course) return <div>Loading...</div>;

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-4">{course.title}</h2>
            <p className="text-gray-600 mb-6">{course.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-4">Course Content</h3>
                    <ul className="space-y-2">
                        {course.Contents?.map((content) => (
                            <li key={content.id} className="p-3 bg-white shadow rounded flex justify-between items-center">
                                <span>{content.title} ({content.type})</span>
                                <a href={content.url.startsWith('/uploads') ? `http://localhost:5000${content.url}` : content.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                    View
                                </a>
                            </li>
                        ))}
                        {(!course.Contents || course.Contents.length === 0) && <p>No content yet.</p>}
                    </ul>
                </div>

                <div className="bg-white p-6 rounded shadow max-h-fit">
                    <h3 className="text-xl font-bold mb-4">Add Content</h3>
                    <form onSubmit={handleUpload}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                            <input type="text" value={contentTitle} onChange={(e) => setContentTitle(e.target.value)} className="w-full px-3 py-2 border rounded" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Type</label>
                            <select value={contentType} onChange={(e) => setContentType(e.target.value)} className="w-full px-3 py-2 border rounded">
                                <option value="video">Video</option>
                                <option value="pdf">PDF</option>
                                <option value="link">Link</option>
                            </select>
                        </div>
                        {contentType === 'link' ? (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">URL</label>
                                <input type="text" value={contentUrl} onChange={(e) => setContentUrl(e.target.value)} className="w-full px-3 py-2 border rounded" required />
                            </div>
                        ) : (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">File Upload</label>
                                <input type="file" onChange={(e) => setFile(e.target.files[0])} className="w-full" required />
                            </div>
                        )}
                        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add Content</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ManageCourse;
