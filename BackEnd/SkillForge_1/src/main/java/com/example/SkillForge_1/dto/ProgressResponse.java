package com.example.SkillForge_1.dto;

import java.util.Map;

public class ProgressResponse {
    private String courseId;
    private int totalMaterials;
    private int completedMaterials;
    private double progressPercent;
    private Map<Long, Double> topicProgressPercent;

    public ProgressResponse() {
    }

    public ProgressResponse(String courseId,
                            int totalMaterials,
                            int completedMaterials,
                            double progressPercent,
                            Map<Long, Double> topicProgressPercent) {
        this.courseId = courseId;
        this.totalMaterials = totalMaterials;
        this.completedMaterials = completedMaterials;
        this.progressPercent = progressPercent;
        this.topicProgressPercent = topicProgressPercent;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public int getTotalMaterials() {
        return totalMaterials;
    }

    public void setTotalMaterials(int totalMaterials) {
        this.totalMaterials = totalMaterials;
    }

    public int getCompletedMaterials() {
        return completedMaterials;
    }

    public void setCompletedMaterials(int completedMaterials) {
        this.completedMaterials = completedMaterials;
    }

    public double getProgressPercent() {
        return progressPercent;
    }

    public void setProgressPercent(double progressPercent) {
        this.progressPercent = progressPercent;
    }

    public Map<Long, Double> getTopicProgressPercent() {
        return topicProgressPercent;
    }

    public void setTopicProgressPercent(Map<Long, Double> topicProgressPercent) {
        this.topicProgressPercent = topicProgressPercent;
    }
}
