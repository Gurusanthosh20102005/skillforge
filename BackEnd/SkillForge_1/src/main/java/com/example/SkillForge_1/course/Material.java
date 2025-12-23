package com.example.SkillForge_1.course;

import jakarta.persistence.*;

@Entity
@Table(name = "materials")
public class Material {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String type; // PDF, Video, Link, Image
    private String url; // path or link
    private String difficulty; // Easy, Medium, Hard

    @ManyToOne
    @JoinColumn(name = "topic_id")
    private Topic topic;

    public Material() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public Topic getTopic() { return topic; }
    public void setTopic(Topic topic) { this.topic = topic; }
}
