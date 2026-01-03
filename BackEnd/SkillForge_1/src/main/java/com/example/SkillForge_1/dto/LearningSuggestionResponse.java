package com.example.SkillForge_1.dto;

public class LearningSuggestionResponse {
    private String suggestedDifficulty;
    private String nextSuggestedLesson;

    public LearningSuggestionResponse() {
    }

    public LearningSuggestionResponse(String suggestedDifficulty, String nextSuggestedLesson) {
        this.suggestedDifficulty = suggestedDifficulty;
        this.nextSuggestedLesson = nextSuggestedLesson;
    }

    public String getSuggestedDifficulty() {
        return suggestedDifficulty;
    }

    public void setSuggestedDifficulty(String suggestedDifficulty) {
        this.suggestedDifficulty = suggestedDifficulty;
    }

    public String getNextSuggestedLesson() {
        return nextSuggestedLesson;
    }

    public void setNextSuggestedLesson(String nextSuggestedLesson) {
        this.nextSuggestedLesson = nextSuggestedLesson;
    }
}
