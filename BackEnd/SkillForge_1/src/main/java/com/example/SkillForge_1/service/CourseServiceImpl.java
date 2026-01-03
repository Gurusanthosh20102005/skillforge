//package com.example.SkillForge_1.service;
//
//import com.example.SkillForge_1.model.Course;
//import com.example.SkillForge_1.model.Material;
//import com.example.SkillForge_1.model.Topic;
//import com.example.SkillForge_1.repository.CourseRepository;
//import com.example.SkillForge_1.repository.MaterialRepository;
//import com.example.SkillForge_1.repository.TopicRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//@Service
//public class CourseServiceImpl implements CourseService {
//
//    @Autowired
//    private CourseRepository courseRepository;
//
//    @Autowired
//    private TopicRepository topicRepository;
//
//    @Autowired
//    private MaterialRepository materialRepository;
//
//    @Override
//    public List<Course> getAllCourses() {
//        return courseRepository.findAll();
//    }
//
//    @Override
//    public Course getCourseById(String courseId) {
//        return courseRepository.findById(courseId)
//                .orElseThrow(() -> new RuntimeException("Course not found"));
//    }
//
//    @Override
//    public Course saveCourse(Course course) {
//        return courseRepository.save(course);
//    }
//
//    @Override
//    public void deleteCourse(String courseId) {
//        courseRepository.deleteById(courseId);
//    }
//
//    // ✅ SAVE TOPIC (correct)
//    @Override
//    public Course saveTopic(String courseId, Topic topic) {
//        Course course = getCourseById(courseId);
//
//        topic.setCourse(course);          // link topic → course
//        course.getTopics().add(topic);    // add topic to course
//
//        return courseRepository.save(course); // 🔥 RETURN COURSE
//    }
//
//    // ✅ ADD MATERIAL (correct)
//    @Override
//    public Material addMaterial(Long topicId, Material material) {
//        Topic topic = topicRepository.findById(topicId)
//                .orElseThrow(() -> new RuntimeException("Topic not found"));
//
//        topic.getMaterials().add(material);
//        topicRepository.save(topic);
//        return material;
//    }
//}
package com.example.SkillForge_1.service;

import com.example.SkillForge_1.model.Course;
import com.example.SkillForge_1.model.Material;
import com.example.SkillForge_1.model.Topic;
import com.example.SkillForge_1.repository.CourseRepository;
import com.example.SkillForge_1.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private TopicRepository topicRepository;

    @Override
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public Course getCourseById(String courseId) {
        return courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
    }

    @Override
    public Course saveCourse(Course course) {
        return courseRepository.save(course);
    }

    @Override
    public void deleteCourse(String courseId) {
        courseRepository.deleteById(courseId);
    }

    @Override
    public Course saveTopic(String courseId, Topic topic) {
        Course course = getCourseById(courseId);
        topic.setCourse(course);
        course.getTopics().add(topic);
        return courseRepository.save(course);
    }

    @Override
    public Course addMaterial(String courseId, int topicIndex, Material material) {
        Course course = getCourseById(courseId);
        if (topicIndex < 0 || topicIndex >= course.getTopics().size()) {
            throw new RuntimeException("Invalid topic index");
        }
        Topic topic = course.getTopics().get(topicIndex);
        topic.getMaterials().add(material);
        return courseRepository.save(course);
    }

    @Override
    public Course updateTopic(String courseId, Long topicId, Topic topic) {
        Course course = getCourseById(courseId);
        Topic existing = course.getTopics().stream()
                .filter(t -> t.getId() != null && t.getId().equals(topicId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Topic not found"));

        if (topic.getName() != null) existing.setName(topic.getName());
        if (topic.getDescription() != null) existing.setDescription(topic.getDescription());
        if (topic.getDifficulty() != null) existing.setDifficulty(topic.getDifficulty());

        return courseRepository.save(course);
    }

    @Override
    public Course deleteTopic(String courseId, Long topicId) {
        Course course = getCourseById(courseId);
        boolean removed = course.getTopics().removeIf(t -> t.getId() != null && t.getId().equals(topicId));
        if (!removed) throw new RuntimeException("Topic not found");
        return courseRepository.save(course);
    }

    @Override
    public Course addMaterialByTopicId(String courseId, Long topicId, Material material) {
        Course course = getCourseById(courseId);
        Topic topic = course.getTopics().stream()
                .filter(t -> t.getId() != null && t.getId().equals(topicId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Topic not found"));
        topic.getMaterials().add(material);
        return courseRepository.save(course);
    }

    @Override
    public Course updateMaterial(String courseId, Long topicId, Long materialId, Material material) {
        Course course = getCourseById(courseId);
        Topic topic = course.getTopics().stream()
                .filter(t -> t.getId() != null && t.getId().equals(topicId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Topic not found"));

        Material existing = topic.getMaterials().stream()
                .filter(m -> m.getId() != null && m.getId().equals(materialId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Material not found"));

        if (material.getName() != null) existing.setName(material.getName());
        if (material.getType() != null) existing.setType(material.getType());
        if (material.getFileName() != null) existing.setFileName(material.getFileName());
        if (material.getUrl() != null) existing.setUrl(material.getUrl());

        return courseRepository.save(course);
    }

    @Override
    public Course deleteMaterial(String courseId, Long topicId, Long materialId) {
        Course course = getCourseById(courseId);
        Topic topic = course.getTopics().stream()
                .filter(t -> t.getId() != null && t.getId().equals(topicId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Topic not found"));

        boolean removed = topic.getMaterials().removeIf(m -> m.getId() != null && m.getId().equals(materialId));
        if (!removed) throw new RuntimeException("Material not found");
        return courseRepository.save(course);
    }
}
