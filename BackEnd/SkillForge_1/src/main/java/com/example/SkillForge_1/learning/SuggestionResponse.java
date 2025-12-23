package com.example.SkillForge_1.learning;

public class SuggestionResponse {
    private String suggestedDifficulty;
    private Long nextTopicId;
    private String nextTopicName;
    private double averageScore;

    public String getSuggestedDifficulty() { return suggestedDifficulty; }
    public void setSuggestedDifficulty(String suggestedDifficulty) { this.suggestedDifficulty = suggestedDifficulty; }

    public Long getNextTopicId() { return nextTopicId; }
    public void setNextTopicId(Long nextTopicId) { this.nextTopicId = nextTopicId; }

    public String getNextTopicName() { return nextTopicName; }
    public void setNextTopicName(String nextTopicName) { this.nextTopicName = nextTopicName; }

    public double getAverageScore() { return averageScore; }
    public void setAverageScore(double averageScore) { this.averageScore = averageScore; }
}
