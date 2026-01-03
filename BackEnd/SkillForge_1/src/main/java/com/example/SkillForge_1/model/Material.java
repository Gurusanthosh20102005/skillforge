//package com.example.SkillForge_1.model;
//
//import jakarta.persistence.*;
//
//@Entity
//@Table(name = "materials")
//public class Material {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String name;
//    private String fileName;
//    private String type;
//
//    @ManyToOne
//    @JoinColumn(name = "topic_id")
//    private Topic topic;
//
//    // getters & setters
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
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
//    public String getFileName() {
//        return fileName;
//    }
//
//    public void setFileName(String fileName) {
//        this.fileName = fileName;
//    }
//
//    public String getType() {
//        return type;
//    }
//
//    public void setType(String type) {
//        this.type = type;
//    }
//
//    public Topic getTopic() {
//        return topic;
//    }
//
//    public void setTopic(Topic topic) {
//        this.topic = topic;
//    }
//}
package com.example.SkillForge_1.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonAlias;

@Entity
@Table(name = "materials")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Material {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    @JsonAlias({"fileName", "file_name", "file"})
    private String fileName;
    private String type;

    // For Link/Video or for serving uploaded files via /uploads/**
    @JsonAlias({"url", "link"})
    private String url;

    // Constructors
    public Material() {}

    public Material(String name, String fileName, String type) {
        this.name = name;
        this.fileName = fileName;
        this.type = type;
    }

    public Material(String name, String fileName, String type, String url) {
        this.name = name;
        this.fileName = fileName;
        this.type = type;
        this.url = url;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
}
