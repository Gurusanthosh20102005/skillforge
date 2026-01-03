package com.example.SkillForge_1.service;

import com.example.SkillForge_1.ai.OpenAiService;
import com.example.SkillForge_1.dto.CompleteMaterialRequest;
import com.example.SkillForge_1.dto.LearningSuggestionResponse;
import com.example.SkillForge_1.dto.ProgressResponse;
import com.example.SkillForge_1.dto.QuizAttemptRequest;
import com.example.SkillForge_1.model.CompletedMaterial;
import com.example.SkillForge_1.model.Course;
import com.example.SkillForge_1.model.Material;
import com.example.SkillForge_1.model.QuizAttempt;
import com.example.SkillForge_1.model.Topic;
import com.example.SkillForge_1.repository.CompletedMaterialRepository;
import com.example.SkillForge_1.repository.CourseRepository;
import com.example.SkillForge_1.repository.QuizAttemptRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class StudentLearningServiceImpl implements StudentLearningService {

    private final CourseRepository courseRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final CompletedMaterialRepository completedMaterialRepository;
    private final OpenAiService openAiService;

    public StudentLearningServiceImpl(CourseRepository courseRepository,
                                     QuizAttemptRepository quizAttemptRepository,
                                     CompletedMaterialRepository completedMaterialRepository,
                                     OpenAiService openAiService) {
        this.courseRepository = courseRepository;
        this.quizAttemptRepository = quizAttemptRepository;
        this.completedMaterialRepository = completedMaterialRepository;
        this.openAiService = openAiService;
    }

    @Override
    public QuizAttempt recordQuizAttempt(String studentEmail, QuizAttemptRequest request) {
        if (request == null || request.getCourseId() == null || request.getCourseId().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "courseId is required");
        }
        if (request.getScore() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "score is required");
        }

        courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found"));

        double score = request.getScore();
        if (score < 0) score = 0;
        if (score > 100) score = 100;

        QuizAttempt attempt = new QuizAttempt(studentEmail, request.getCourseId(), request.getTopicId(), score);
        return quizAttemptRepository.save(attempt);
    }

    @Override
    @Transactional
    public CompletedMaterial markMaterialCompleted(String studentEmail, CompleteMaterialRequest request) {
        if (request == null || request.getCourseId() == null || request.getCourseId().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "courseId is required");
        }
        if (request.getTopicId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "topicId is required");
        }
        if (request.getMaterialId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "materialId is required");
        }

        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found"));

        Topic topic = course.getTopics().stream()
                .filter(t -> t.getId() != null && t.getId().equals(request.getTopicId()))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Topic does not belong to course"));

        boolean materialExistsInTopic = topic.getMaterials().stream()
                .anyMatch(m -> m.getId() != null && m.getId().equals(request.getMaterialId()));

        if (!materialExistsInTopic) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Material does not belong to topic");
        }

        return completedMaterialRepository
                .findByStudentEmailAndMaterialId(studentEmail, request.getMaterialId())
                .orElseGet(() -> completedMaterialRepository.save(
                        new CompletedMaterial(studentEmail, request.getCourseId(), request.getTopicId(), request.getMaterialId())
                ));
    }

    @Override
    @Transactional
    public ProgressResponse getCourseProgress(String studentEmail, String courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found"));

        int totalMaterials = 0;
        Map<Long, Integer> totalByTopic = new HashMap<>();

        for (Topic topic : course.getTopics()) {
            int topicTotal = topic.getMaterials() == null ? 0 : topic.getMaterials().size();
            totalMaterials += topicTotal;
            if (topic.getId() != null) {
                totalByTopic.put(topic.getId(), topicTotal);
            }
        }

        long completedMaterials = completedMaterialRepository.countByStudentEmailAndCourseId(studentEmail, courseId);

        double progressPercent = 0.0;
        if (totalMaterials > 0) {
            progressPercent = (completedMaterials * 100.0) / totalMaterials;
        }

        Map<Long, Double> topicProgressPercent = new HashMap<>();
        for (Map.Entry<Long, Integer> e : totalByTopic.entrySet()) {
            long topicCompleted = completedMaterialRepository.countByStudentEmailAndCourseIdAndTopicId(studentEmail, courseId, e.getKey());
            double pct = e.getValue() == 0 ? 0.0 : (topicCompleted * 100.0) / e.getValue();
            topicProgressPercent.put(e.getKey(), pct);
        }

        return new ProgressResponse(courseId, totalMaterials, (int) completedMaterials, progressPercent, topicProgressPercent);
    }

    @Override
    @Transactional
    public LearningSuggestionResponse getLearningSuggestion(String studentEmail, String courseId) {
        courseRepository.findById(courseId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found"));

        List<QuizAttempt> attempts = quizAttemptRepository.findTop20ByStudentEmailAndCourseIdOrderByAttemptedAtDesc(studentEmail, courseId);
        double avgScore = attempts.stream().mapToDouble(a -> a.getScore() == null ? 0.0 : a.getScore()).average().orElse(0.0);

        String heuristic;
        if (avgScore >= 80.0) heuristic = "Hard";
        else if (avgScore >= 50.0) heuristic = "Medium";
        else heuristic = "Easy";

        String suggestedDifficulty = openAiService.refineDifficultySuggestion(avgScore, heuristic);

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found"));

        List<CompletedMaterial> completed = completedMaterialRepository.findByStudentEmailAndCourseId(studentEmail, courseId);
        Set<Long> completedIds = new HashSet<>();
        for (CompletedMaterial cm : completed) {
            completedIds.add(cm.getMaterialId());
        }

        String nextLesson = "All materials completed";

        outer:
        for (Topic topic : course.getTopics()) {
            if (topic.getMaterials() == null) continue;
            for (Material material : topic.getMaterials()) {
                if (material.getId() == null) continue;
                if (!completedIds.contains(material.getId())) {
                    String materialLabel = material.getName() != null ? material.getName() : (material.getFileName() != null ? material.getFileName() : "Material " + material.getId());
                    String topicLabel = topic.getName() != null ? topic.getName() : ("Topic " + topic.getId());
                    nextLesson = topicLabel + ": " + materialLabel;
                    break outer;
                }
            }
        }

        return new LearningSuggestionResponse(suggestedDifficulty, nextLesson);
    }
}
