package com.example.SkillForge_1.dto;

public class RegisterResponse {
    private String token;
    private String name;
    private int age;
    private String email;
    private String role;

    public RegisterResponse() {} // <- no-args constructor

    public RegisterResponse(String token, String name, int age, String email, String role) {
        this.token = token;
        this.name = name;
        this.age = age;
        this.email = email;
        this.role = role;
    }

    // Getters & Setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
