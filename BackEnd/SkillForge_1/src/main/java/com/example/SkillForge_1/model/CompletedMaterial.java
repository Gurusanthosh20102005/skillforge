package com.example.SkillForge_1.model;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "completed_materials")
public class CompletedMaterial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "student_email", nullable = false)
    private String studentEmail;

    @Column(name = "course_id", nullable = false)
    private String courseId;

    @Column(name = "topic_id", nullable = false)
    private Long topicId;

    @Column(name = "material_id", nullable = false)
    private Long materialId;

    @Column(name = "completed_at", nullable = false)
    private Instant completedAt = Instant.now();

    public CompletedMaterial() {
    }

    public CompletedMaterial(String studentEmail, String courseId, Long topicId, Long materialId) {
        this.studentEmail = studentEmail;
        this.courseId = courseId;
        this.topicId = topicId;
        this.materialId = materialId;
        this.completedAt = Instant.now();
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

    public Long getMaterialId() {
        return materialId;
    }

    public void setMaterialId(Long materialId) {
        this.materialId = materialId;
    }

    public Instant getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(Instant completedAt) {
        this.completedAt = completedAt;
    }
}
