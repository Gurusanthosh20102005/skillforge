package com.example.SkillForge_1.repository;

import com.example.SkillForge_1.model.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {
    List<QuizAttempt> findTop20ByStudentEmailAndCourseIdOrderByAttemptedAtDesc(String studentEmail, String courseId);
}
