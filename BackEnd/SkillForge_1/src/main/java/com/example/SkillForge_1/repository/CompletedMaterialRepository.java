package com.example.SkillForge_1.repository;

import com.example.SkillForge_1.model.CompletedMaterial;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CompletedMaterialRepository extends JpaRepository<CompletedMaterial, Long> {
    Optional<CompletedMaterial> findByStudentEmailAndMaterialId(String studentEmail, Long materialId);

    List<CompletedMaterial> findByStudentEmailAndCourseId(String studentEmail, String courseId);

    long countByStudentEmailAndCourseId(String studentEmail, String courseId);

    long countByStudentEmailAndCourseIdAndTopicId(String studentEmail, String courseId, Long topicId);
}
