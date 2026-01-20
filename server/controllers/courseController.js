const Course = require('../models/Course');
const Content = require('../models/Content');
const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

// Init Upload
const upload = multer({
    storage: storage,
}).single('file'); // 'file' is the field name

exports.createCourse = async (req, res) => {
    try {
        const { title, description, difficultyLevel } = req.body;
        const course = await Course.create({
            title,
            description,
            difficultyLevel,
            instructorId: req.user.id,
        });
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCourses = async (req, res) => {
    try {
        // If instructor, get own courses. If student, potentially get all or recommended
        const where = req.user.role === 'instructor' ? { instructorId: req.user.id } : {};
        const courses = await Course.findAll({ where });
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id, {
            include: Content
        });
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findOne({ where: { id: req.params.id, instructorId: req.user.id } });
        if (!course) return res.status(404).json({ message: 'Course not found or unauthorized' });

        await course.destroy();
        res.json({ message: 'Course removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.addContent = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err });
        } else {
            try {
                const { title, type } = req.body;
                const course = await Course.findOne({ where: { id: req.params.id, instructorId: req.user.id } });

                if (!course) {
                    return res.status(404).json({ message: 'Course not found or unauthorized' });
                }

                const url = req.file ? `/uploads/${req.file.filename}` : req.body.url;

                if (!url && type !== 'link') {
                    return res.status(400).json({ message: 'File or URL is required' });
                }

                const content = await Content.create({
                    title,
                    type,
                    url: url || req.body.url,
                    courseId: req.params.id,
                });

                res.status(201).json(content);
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        }
    });
};
