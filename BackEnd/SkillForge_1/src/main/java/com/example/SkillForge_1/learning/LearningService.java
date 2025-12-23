package com.example.SkillForge_1.learning;

import com.example.SkillForge_1.course.Topic;
import com.example.SkillForge_1.course.TopicRepository;
import com.example.SkillForge_1.model.UserAuthentication;
import com.example.SkillForge_1.repository.UserAuthenticationRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.OptionalDouble;

@Service
public class LearningService {

    private final ProgressRepository progressRepository;
    private final UserAuthenticationRepository userRepository;
    private final TopicRepository topicRepository;
    private final com.example.SkillForge_1.ai.OpenAiService openAiService;

    public LearningService(ProgressRepository progressRepository,
                           UserAuthenticationRepository userRepository,
                           TopicRepository topicRepository,
                           com.example.SkillForge_1.ai.OpenAiService openAiService) {
        this.progressRepository = progressRepository;
        this.userRepository = userRepository;
        this.topicRepository = topicRepository;
        this.openAiService = openAiService;
    }

    public Progress recordProgress(String userEmail, Long courseId, Long topicId, int score) throws Exception {
        UserAuthentication user = userRepository.findByEmail(userEmail).orElseThrow(() -> new Exception("User not found"));
        Progress p = new Progress();
        p.setUser(user);
        p.setCourseId(courseId);
        p.setTopicId(topicId);
        p.setScore(score);
        return progressRepository.save(p);
    }

    public SuggestionResponse suggestNext(String userEmail) throws Exception {
        UserAuthentication user = userRepository.findByEmail(userEmail).orElseThrow(() -> new Exception("User not found"));

        List<Progress> history = progressRepository.findByUserIdOrderByCreatedAtDesc(user.getId());

        // Simple heuristic: average score decides difficulty
        OptionalDouble avgOpt = history.stream().mapToInt(Progress::getScore).average();
        double avg = avgOpt.isPresent() ? avgOpt.getAsDouble() : 100.0; // assume high if no history

        String suggestedDifficulty;
        if (avg < 50) suggestedDifficulty = "Easy";
        else if (avg >= 75) suggestedDifficulty = "Hard";
        else suggestedDifficulty = "Medium";

        // Suggest next topic: pick topic with difficulty matching suggested that user hasn't recently seen
        List<Topic> topics = topicRepository.findAll();
        Topic next = topics.stream()
                .filter(t -> t.getDifficulty() != null && t.getDifficulty().equalsIgnoreCase(suggestedDifficulty))
                .min(Comparator.comparing(Topic::getId))
                .orElse(null);

        // Optionally refine using OpenAI
        String refined = openAiService.refineDifficultySuggestion(avg, suggestedDifficulty);

        SuggestionResponse resp = new SuggestionResponse();
        resp.setSuggestedDifficulty(refined);
        if (next != null) {
            resp.setNextTopicId(next.getId());
            resp.setNextTopicName(next.getName());
        }
        resp.setAverageScore(avg);
        return resp;
    }
}
