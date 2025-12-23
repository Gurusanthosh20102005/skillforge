package com.example.SkillForge_1.learning;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/learning")
@CrossOrigin(origins = "http://localhost:3000")
public class LearningController {

    private final LearningService learningService;

    public LearningController(LearningService learningService) {
        this.learningService = learningService;
    }

    @PostMapping("/progress")
    public ResponseEntity<?> recordProgress(@RequestBody ProgressRequest req) {
        try {
            Progress p = learningService.recordProgress(req.getUserEmail(), req.getCourseId(), req.getTopicId(), req.getScore());
            return ResponseEntity.ok(p);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/suggest/{email}")
    public ResponseEntity<?> suggest(@PathVariable String email) {
        try {
            SuggestionResponse resp = learningService.suggestNext(email);
            return ResponseEntity.ok(resp);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/suggest/gpt/{email}")
    public ResponseEntity<?> suggestWithGpt(@PathVariable String email) {
        try {
            SuggestionResponse resp = learningService.suggestNext(email); // already refines with OpenAI if available
            return ResponseEntity.ok(resp);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
