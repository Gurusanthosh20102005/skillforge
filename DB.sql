USE skillforge;
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('STUDENT','INSTRUCTOR','ADMIN') NOT NULL,
    status ENUM('ACTIVE','INACTIVE') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    instructor_id INT,
    course_title VARCHAR(200),
    description TEXT,
    difficulty ENUM('BEGINNER','INTERMEDIATE','ADVANCED'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (instructor_id) REFERENCES users(user_id)
);
CREATE TABLE topics (
    topic_id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT,
    topic_title VARCHAR(200),
    difficulty ENUM('BEGINNER','INTERMEDIATE','ADVANCED'),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
CREATE TABLE learning_materials (
    material_id INT AUTO_INCREMENT PRIMARY KEY,
    topic_id INT,
    material_type ENUM('VIDEO','PDF','LINK'),
    title VARCHAR(200),
    resource_url TEXT,
    difficulty ENUM('BEGINNER','INTERMEDIATE','ADVANCED'),
    FOREIGN KEY (topic_id) REFERENCES topics(topic_id)
);
CREATE TABLE student_course_enrollment (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    course_id INT,
    current_level ENUM('BEGINNER','INTERMEDIATE','ADVANCED') DEFAULT 'BEGINNER',
    progress_percent DECIMAL(5,2) DEFAULT 0,
    FOREIGN KEY (student_id) REFERENCES users(user_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
CREATE TABLE student_topic_progress (
    progress_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    topic_id INT,
    completion_status ENUM('NOT_STARTED','IN_PROGRESS','COMPLETED'),
    score_avg DECIMAL(5,2),
    last_accessed TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(user_id),
    FOREIGN KEY (topic_id) REFERENCES topics(topic_id)
);
CREATE TABLE quizzes (
    quiz_id INT AUTO_INCREMENT PRIMARY KEY,
    topic_id INT,
    created_by INT,
    difficulty ENUM('BEGINNER','INTERMEDIATE','ADVANCED'),
    generated_by ENUM('AI','INSTRUCTOR'),
    duration_minutes INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (topic_id) REFERENCES topics(topic_id),
    FOREIGN KEY (created_by) REFERENCES users(user_id)
);
CREATE TABLE quiz_questions (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT,
    question_text TEXT,
    question_type ENUM('MCQ','SHORT','LONG'),
    correct_answer TEXT,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id)
);
CREATE TABLE quiz_options (
    option_id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT,
    option_text TEXT,
    is_correct BOOLEAN,
    FOREIGN KEY (question_id) REFERENCES quiz_questions(question_id)
);
CREATE TABLE quiz_attempts (
    attempt_id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT,
    student_id INT,
    score DECIMAL(5,2),
    started_at DATETIME,
    submitted_at DATETIME,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id),
    FOREIGN KEY (student_id) REFERENCES users(user_id)
);
CREATE TABLE quiz_answers (
    answer_id INT AUTO_INCREMENT PRIMARY KEY,
    attempt_id INT,
    question_id INT,
    submitted_answer TEXT,
    is_correct BOOLEAN,
    marks_awarded DECIMAL(5,2),
    FOREIGN KEY (attempt_id) REFERENCES quiz_attempts(attempt_id),
    FOREIGN KEY (question_id) REFERENCES quiz_questions(question_id)
);
CREATE TABLE performance_analytics (
    analytics_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    topic_id INT,
    avg_score DECIMAL(5,2),
    attempt_count INT,
    adaptive_level ENUM('BEGINNER','INTERMEDIATE','ADVANCED'),
    FOREIGN KEY (student_id) REFERENCES users(user_id),
    FOREIGN KEY (topic_id) REFERENCES topics(topic_id)
);
CREATE TABLE skill_progression_log (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    level ENUM('BEGINNER','INTERMEDIATE','ADVANCED'),
    changed_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(user_id)
);
CREATE TABLE system_settings (
    setting_id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100),
    setting_value VARCHAR(255)
);
