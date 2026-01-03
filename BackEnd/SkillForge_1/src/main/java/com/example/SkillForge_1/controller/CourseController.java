//package com.example.SkillForge_1.controller;
//
//import com.example.SkillForge_1.model.Course;
//import com.example.SkillForge_1.model.Material;
//import com.example.SkillForge_1.model.Topic;
//import com.example.SkillForge_1.service.CourseService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/course")
//@CrossOrigin(origins = "http://localhost:5173") // frontend URL for CORS
//public class CourseController {
//
//    @Autowired
//    private CourseService courseService;
//
//    @GetMapping
//    public List<Course> getAllCourses() {
//        return courseService.getAllCourses();
//    }
//
//    @GetMapping("/{id}")
//    public Course getCourseById(@PathVariable String id) {
//        return courseService.getCourseById(id);
//    }
//
//    @PostMapping
//    public Course createCourse(@RequestBody Course course) {
//        return courseService.saveCourse(course);
//    }
//
//    @DeleteMapping("/{id}")
//    public void deleteCourse(@PathVariable String id) {
//        courseService.deleteCourse(id);
//    }
//
//    @PostMapping("/{courseId}/topics")
//    public Course addTopic(@PathVariable String courseId, @RequestBody Topic topic) {
//        return courseService.saveTopic(courseId, topic);
//    }
//
//    @PostMapping("/{courseId}/topics/{topicIndex}/materials")
//    public Course addMaterial(@PathVariable String courseId,
//                              @PathVariable int topicIndex,
//                              @RequestBody Material material) {
//        return courseService.addMaterial(courseId, topicIndex, material);
//    }
//    @PutMapping("/{id}")
//    public Course updateCourse(@PathVariable String id, @RequestBody Course course) {
//        course.setCourse_id(id); // now works
//        return courseService.saveCourse(course);
//    }
//
//}
package com.example.SkillForge_1.controller;

import com.example.SkillForge_1.model.Course;
import com.example.SkillForge_1.model.Material;
import com.example.SkillForge_1.model.Topic;
import com.example.SkillForge_1.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/{id}")
    public Course getCourseById(@PathVariable String id) {
        return courseService.getCourseById(id);
    }

    @PostMapping
    public Course createCourse(@RequestBody Course course) {
        return courseService.saveCourse(course);
    }

    @PutMapping("/{id}")
    public Course updateCourse(@PathVariable String id, @RequestBody Course course) {
        course.setCourseId(id);
        return courseService.saveCourse(course);
    }

    @DeleteMapping("/{id}")
    public void deleteCourse(@PathVariable String id) {
        courseService.deleteCourse(id);
    }

    @PostMapping("/{courseId}/topics")
    public Course addTopic(@PathVariable String courseId, @RequestBody Topic topic) {
        return courseService.saveTopic(courseId, topic);
    }

    @PutMapping("/{courseId}/topics/{topicId}")
    public Course updateTopic(@PathVariable String courseId, @PathVariable Long topicId, @RequestBody Topic topic) {
        return courseService.updateTopic(courseId, topicId, topic);
    }

    @DeleteMapping("/{courseId}/topics/{topicId}")
    public Course deleteTopic(@PathVariable String courseId, @PathVariable Long topicId) {
        return courseService.deleteTopic(courseId, topicId);
    }

    @PostMapping("/{courseId}/topics/{topicIndex}/materials")
    public Course addMaterial(@PathVariable String courseId,
                              @PathVariable int topicIndex,
                              @RequestBody Material material) {
        return courseService.addMaterial(courseId, topicIndex, material);
    }

    // Material by topicId (preferred)
    @PostMapping("/{courseId}/topics/{topicId}/materials")
    public Course addMaterialByTopicId(@PathVariable String courseId,
                                       @PathVariable Long topicId,
                                       @RequestBody Material material) {
        return courseService.addMaterialByTopicId(courseId, topicId, material);
    }

    @PutMapping("/{courseId}/topics/{topicId}/materials/{materialId}")
    public Course updateMaterial(@PathVariable String courseId,
                                 @PathVariable Long topicId,
                                 @PathVariable Long materialId,
                                 @RequestBody Material material) {
        return courseService.updateMaterial(courseId, topicId, materialId, material);
    }

    @DeleteMapping("/{courseId}/topics/{topicId}/materials/{materialId}")
    public Course deleteMaterial(@PathVariable String courseId,
                                 @PathVariable Long topicId,
                                 @PathVariable Long materialId) {
        return courseService.deleteMaterial(courseId, topicId, materialId);
    }

    // Upload PDF/Image and store material with public URL (/uploads/**)
    @PostMapping(value = "/{courseId}/topics/{topicId}/materials/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Course uploadMaterial(@PathVariable String courseId,
                                 @PathVariable Long topicId,
                                 @RequestParam("name") String name,
                                 @RequestParam("type") String type,
                                 @RequestPart("file") MultipartFile file) throws IOException {

        Path uploadsDir = Paths.get("uploads");
        if (!Files.exists(uploadsDir)) {
            Files.createDirectories(uploadsDir);
        }

        String original = file.getOriginalFilename();
        String safeOriginal = (original == null || original.isBlank()) ? "file" : original.replaceAll("[^a-zA-Z0-9._-]", "_");
        String storedName = UUID.randomUUID() + "_" + safeOriginal;
        Path target = uploadsDir.resolve(storedName);
        Files.copy(file.getInputStream(), target);

        Material material = new Material();
        material.setName(name);
        material.setType(type);
        material.setFileName(storedName);
        material.setUrl("/uploads/" + storedName);

        return courseService.addMaterialByTopicId(courseId, topicId, material);
    }
}
