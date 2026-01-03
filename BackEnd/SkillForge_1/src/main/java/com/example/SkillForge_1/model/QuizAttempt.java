package com.example.SkillForge_1.model;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "quiz_attempts")
public class QuizAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "student_email", nullable = false)
    private String studentEmail;

    @Column(name = "course_id", nullable = false)
    private String courseId;

    @Column(name = "topic_id")
    private Long topicId;

    @Column(name = "score", nullable = false)
    private Double score;

    @Column(name = "attempted_at", nullable = false)
    private Instant attemptedAt = Instant.now();

    public QuizAttempt() {
    }

    public QuizAttempt(String studentEmail, String courseId, Long topicId, Double score) {
        this.studentEmail = studentEmail;
        this.courseId = courseId;
        this.topicId = topicId;
        this.score = score;
        this.attemptedAt = Instant.now();
    }

    public Long getId() {
        return id;
    }

    public String getStudentEmail() {
        return studentEmail;
    }

    public void setStudentEmail(String studentEmail) {
        this.studentEmail = studentEmail;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public Long getTopicId() {
        return topicId;
    }

    public void setTopicId(Long topicId) {
        this.topicId = topicId;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public Instant getAttemptedAt() {
        return attemptedAt;
    }

    public void setAttemptedAt(Instant attemptedAt) {
        this.attemptedAt = attemptedAt;
    }
}
