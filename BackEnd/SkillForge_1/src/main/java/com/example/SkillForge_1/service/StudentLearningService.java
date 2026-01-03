package com.example.SkillForge_1.service;

import com.example.SkillForge_1.dto.CompleteMaterialRequest;
import com.example.SkillForge_1.dto.LearningSuggestionResponse;
import com.example.SkillForge_1.dto.ProgressResponse;
import com.example.SkillForge_1.dto.QuizAttemptRequest;
import com.example.SkillForge_1.model.CompletedMaterial;
import com.example.SkillForge_1.model.QuizAttempt;

public interface StudentLearningService {
    QuizAttempt recordQuizAttempt(String studentEmail, QuizAttemptRequest request);

    CompletedMaterial markMaterialCompleted(String studentEmail, CompleteMaterialRequest request);

    ProgressResponse getCourseProgress(String studentEmail, String courseId);

    LearningSuggestionResponse getLearningSuggestion(String studentEmail, String courseId);
}
