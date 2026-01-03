//package com.example.SkillForge_1.service;
//
//import com.example.SkillForge_1.model.Course;
//import com.example.SkillForge_1.model.Material;
//import com.example.SkillForge_1.model.Topic;
//
//import java.util.List;
//public interface CourseService {
//
//    List<Course> getAllCourses();
//
//    Course getCourseById(String courseId);
//
//    Course saveCourse(Course course);
//
//    void deleteCourse(String courseId);
//
//    Course saveTopic(String courseId, Topic topic);
//
//    Material addMaterial(Long topicId, Material material);
//}
package com.example.SkillForge_1.service;

import com.example.SkillForge_1.model.Course;
import com.example.SkillForge_1.model.Material;
import com.example.SkillForge_1.model.Topic;

import java.util.List;

public interface CourseService {
    List<Course> getAllCourses();
    Course getCourseById(String courseId);
    Course saveCourse(Course course);
    void deleteCourse(String courseId);

    Course saveTopic(String courseId, Topic topic);
    Course addMaterial(String courseId, int topicIndex, Material material);

    Course updateTopic(String courseId, Long topicId, Topic topic);
    Course deleteTopic(String courseId, Long topicId);

    Course addMaterialByTopicId(String courseId, Long topicId, Material material);
    Course updateMaterial(String courseId, Long topicId, Long materialId, Material material);
    Course deleteMaterial(String courseId, Long topicId, Long materialId);
}
