package com.example.SkillForge_1.learning;

import com.example.SkillForge_1.model.UserAuthentication;
import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "progress")
public class Progress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserAuthentication user;

    private Long courseId;
    private Long topicId;
    private int score; // 0-100
    private Instant createdAt;

    public Progress() { this.createdAt = Instant.now(); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public UserAuthentication getUser() { return user; }
    public void setUser(UserAuthentication user) { this.user = user; }

    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }

    public Long getTopicId() { return topicId; }
    public void setTopicId(Long topicId) { this.topicId = topicId; }

    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
