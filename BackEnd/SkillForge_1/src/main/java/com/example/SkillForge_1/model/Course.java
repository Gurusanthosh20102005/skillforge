//package com.example.SkillForge_1.model;
//
//import jakarta.persistence.*;
//import java.util.ArrayList;
//import java.util.List;
//
//@Entity
//@Table(name = "courses")
//public class Course {
//
//    @Id
//    @Column(name = "course_id")
//    private String courseId;
//
//    private String name;
//    private String description;
//    private String difficulty;
//    private Integer studentStrength;
//
//    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Topic> topics = new ArrayList<>();
//
//    // ===== getters & setters =====
//
//    public String getCourseId() {
//        return courseId;
//    }
//
//    public void setCourseId(String courseId) {
//        this.courseId = courseId;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public String getDescription() {
//        return description;
//    }
//
//    public void setDescription(String description) {
//        this.description = description;
//    }
//
//    public String getDifficulty() {
//        return difficulty;
//    }
//
//    public void setDifficulty(String difficulty) {
//        this.difficulty = difficulty;
//    }
//
//    public Integer getStudentStrength() {
//        return studentStrength;
//    }
//
//    public void setStudentStrength(Integer studentStrength) {
//        this.studentStrength = studentStrength;
//    }
//
//    public List<Topic> getTopics() {
//        return topics;
//    }
//
//    public void setTopics(List<Topic> topics) {
//        this.topics = topics;
//    }
//}

package com.example.SkillForge_1.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonAlias;
import java.util.ArrayList;
import java.util.List;
@Entity
@Table(name = "courses")
public class Course {

    @Id
    @Column(name = "course_id")
    @JsonAlias({"course_id", "courseId"})
    private String courseId;

    @Column(name = "name")
    @JsonAlias({"name", "courseName", "course_title", "courseTitle"})
    private String name;

    @Column(name = "description")
    @JsonAlias({"description"})
    private String description;

    @Column(name = "difficulty")
    @JsonAlias({"difficulty"})
    private String difficulty;

    @Column(name = "student_strength")
    @JsonAlias({"studentStrength", "student_strength", "totalStudents", "total_students"})
    private Integer studentStrength;

    @Column(name = "instructor_id")
    @JsonAlias({"instructorId", "instructor_id"})
    private String instructorId;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "course_id")
    private List<Topic> topics = new ArrayList<>();
    // Constructors

    public Course() {}

    public Course(String courseId, String instructorId,String name, String description, String difficulty, Integer studentStrength) {
        this.courseId = courseId;
        this.instructorId=instructorId;
        this.name = name;
        this.description = description;
        this.difficulty = difficulty;
        this.studentStrength = studentStrength;
    }

    // Getters and Setters
    public String getCourseId() { return courseId; }
    public void setCourseId(String courseId) { this.courseId = courseId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public Integer getStudentStrength() { return studentStrength; }
    public void setStudentStrength(Integer studentStrength) { this.studentStrength = studentStrength; }

    public String getInstructorId() { return instructorId; }
    public void setInstructorId(String instructorId) { this.instructorId = instructorId; }

    public List<Topic> getTopics() { return topics; }
    public void setTopics(List<Topic> topics) { this.topics = topics; }
}
