const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');
const quizRoutes = require('./routes/quizRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/analytics', analyticsRoutes);

app.get('/', (req, res) => {
    res.send('SkillForge Backend is running!');
});

// Import models to ensure they are registered with Sequelize
require('./models');

// Database connection only (Sync handled manually via SQL script)
// Database connection only (Sync handled manually via SQL script)
sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully.');
        const server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        server.on('error', (e) => console.error('Server error:', e));
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
    });
