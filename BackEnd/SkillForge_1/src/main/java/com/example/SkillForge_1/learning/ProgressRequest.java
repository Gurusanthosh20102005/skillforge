package com.example.SkillForge_1.learning;

public class ProgressRequest {
    private String userEmail;
    private Long courseId;
    private Long topicId;
    private int score;

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }

    public Long getTopicId() { return topicId; }
    public void setTopicId(Long topicId) { this.topicId = topicId; }

    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }
}
