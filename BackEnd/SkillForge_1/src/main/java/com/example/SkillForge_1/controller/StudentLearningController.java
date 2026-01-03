package com.example.SkillForge_1.controller;

import com.example.SkillForge_1.dto.CompleteMaterialRequest;
import com.example.SkillForge_1.dto.LearningSuggestionResponse;
import com.example.SkillForge_1.dto.ProgressResponse;
import com.example.SkillForge_1.dto.QuizAttemptRequest;
import com.example.SkillForge_1.model.CompletedMaterial;
import com.example.SkillForge_1.model.QuizAttempt;
import com.example.SkillForge_1.service.StudentLearningService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class StudentLearningController {

    private final StudentLearningService studentLearningService;

    public StudentLearningController(StudentLearningService studentLearningService) {
        this.studentLearningService = studentLearningService;
    }

    @PostMapping("/quiz-attempts")
    public QuizAttempt recordQuizAttempt(@RequestBody QuizAttemptRequest request, Principal principal) {
        String studentEmail = principal.getName();
        return studentLearningService.recordQuizAttempt(studentEmail, request);
    }

    @PostMapping("/completed-materials")
    public CompletedMaterial markCompleted(@RequestBody CompleteMaterialRequest request, Principal principal) {
        String studentEmail = principal.getName();
        return studentLearningService.markMaterialCompleted(studentEmail, request);
    }

    @GetMapping("/courses/{courseId}/progress")
    public ProgressResponse getProgress(@PathVariable String courseId, Principal principal) {
        String studentEmail = principal.getName();
        return studentLearningService.getCourseProgress(studentEmail, courseId);
    }

    @GetMapping("/courses/{courseId}/suggestion")
    public LearningSuggestionResponse getSuggestion(@PathVariable String courseId, Principal principal) {
        String studentEmail = principal.getName();
        return studentLearningService.getLearningSuggestion(studentEmail, courseId);
    }
}
